const axios = require('axios');
const { generateRoomCode, updateRoomPlayers, sendNextQuestion, endQuiz } = require('../helpers/room');

module.exports = (io, redisClient) => {
  io.on('connection', (socket) => {
    console.log(`[Socket] New connection: ${socket.id}`);
    
    // User identifies themselves after connecting
    socket.on('user:identify', async ({ userId, username }) => {
      console.log(`[Socket] User identify: ${username} (${userId})`);
      socket.userId = userId;
      socket.username = username;
      // Store socket mapping in Redis
      await redisClient.set('gnosis:socket:' + userId, socket.id, { EX: 3600 });
      // Also mark as online for notification service
      await redisClient.set('gnosis:online:' + userId, '1', { EX: 30 });
    });

    socket.on('user:heartbeat', async ({ userId }) => {
      // Refresh online status and socket mapping
      await redisClient.set('gnosis:online:' + userId, '1', { EX: 30 });
      if (socket.id) {
        await redisClient.set('gnosis:socket:' + userId, socket.id, { EX: 3600 });
      }
    });

    socket.on('disconnect', async () => {
      if (socket.userId) {
        await redisClient.del('gnosis:socket:' + socket.userId);
        await redisClient.del('gnosis:online:' + socket.userId);
      }
    });

    socket.on('challenge:send', async ({ toUserId, toUsername, subjectId, levelId, subjectName, levelNumber }) => {
      const targetSocketId = await redisClient.get('gnosis:socket:' + toUserId);
      if (!targetSocketId) {
        socket.emit('challenge:error', { message: 'User is offline' });
        return;
      }
      
      await redisClient.set(
        'gnosis:challenge:' + toUserId,
        JSON.stringify({
          fromUserId: socket.userId,
          fromUsername: socket.username,
          subjectId, levelId, subjectName, levelNumber
        }),
        { EX: 60 }
      );

      io.to(targetSocketId).emit('challenge:received', {
        fromUserId: socket.userId,
        fromUsername: socket.username,
        subjectId, levelId, subjectName, levelNumber
      });
      
      socket.emit('challenge:sent', { message: 'Challenge sent' });
    });

    socket.on('challenge:respond', async ({ accepted, fromUserId, subjectId, levelId, subjectName, levelNumber }) => {
      const challengerSocketId = await redisClient.get('gnosis:socket:' + fromUserId);
      
      if (!accepted) {
        if (challengerSocketId) {
          io.to(challengerSocketId).emit('challenge:rejected', { by: socket.username });
        }
        return;
      }

      // ACCEPTED — create room
      const roomCode = await generateRoomCode(redisClient);
      
      let questions = [];
      try {
        // FETCH 10 RANDOM QUESTIONS FROM INTERNAL POOL
        const res = await axios.get(`http://content-service:3002/content/levels/${levelId}/questions?internal=true`);
        questions = res.data;
        
        if (!questions || questions.length === 0) {
           const subRes = await axios.get(`http://content-service:3002/content/subjects/${subjectId}`);
           const firstLevelId = subRes.data.levels[0].id;
           const fallbackRes = await axios.get(`http://content-service:3002/content/levels/${firstLevelId}/questions?internal=true`);
           questions = fallbackRes.data;
        }
        // Take only 10
        questions = questions.slice(0, 10);
      } catch (err) {
        console.error("Critical: Failed to fetch battle questions:", err.message);
        socket.emit('challenge:error', { message: 'Failed to prepare questions. Try again.' });
        return;
      }

      const challengerDataRaw = await redisClient.get('gnosis:challenge:' + socket.userId);
      const challengerUsername = challengerDataRaw ? JSON.parse(challengerDataRaw).fromUsername : 'Challenger';

      const players = [
        { userId: fromUserId, username: challengerUsername, socketId: '', score: 0, answered: false },
        { userId: socket.userId, username: socket.username, socketId: '', score: 0, answered: false }
      ];

      await redisClient.hSet('gnosis:room:' + roomCode, {
        type: '1v1',
        host_id: fromUserId,
        host_socket: challengerSocketId || '',
        subject_id: subjectId,
        level_id: levelId || '',
        subject_name: subjectName || 'Battle',
        level_number: levelNumber ? levelNumber.toString() : '1',
        status: 'waiting',
        questions: JSON.stringify(questions),
        current_index: '0',
        q_sent_at: '0',
        players: JSON.stringify(players)
      });
      await redisClient.expire('gnosis:room:' + roomCode, 1800);

      socket.join(roomCode);
      if (challengerSocketId) {
        io.to(challengerSocketId).emit('challenge:accepted', { roomCode, subjectName });
      }
      socket.emit('challenge:accepted', { roomCode });
    });

    // ---- GROUP QUIZ EVENTS ----
    socket.on('group:create', async ({ hostId, hostUsername, quizName, questions }) => {
      const roomCode = await generateRoomCode(redisClient);
      
      await redisClient.hSet('gnosis:room:' + roomCode, {
        type: 'group',
        host_id: hostId,
        host_socket: socket.id,
        quiz_name: quizName,
        status: 'waiting',
        questions: JSON.stringify(questions),
        current_index: '0',
        q_sent_at: '0',
        players: JSON.stringify([])
      });
      await redisClient.expire('gnosis:room:' + roomCode, 7200);

      socket.join(roomCode);
      socket.roomCode = roomCode;
      socket.emit('group:created', { roomCode, quizName });
    });

    socket.on('room:host_join', async ({ roomCode, userId, username }) => {
        socket.join(roomCode);
        socket.roomCode = roomCode;
        socket.userId = userId;
        socket.username = username;

        // Ensure host socket is updated in Redis room data if reconnected
        await redisClient.hSet('gnosis:room:' + roomCode, 'host_socket', socket.id);

        const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
        let players = JSON.parse(roomData.players || '[]');
        
        // Update host socket in players array if it's a 1v1 (host IS a player)
        const playerIndex = players.findIndex(p => p.userId === userId);
        if (playerIndex !== -1) {
            players[playerIndex].socketId = socket.id;
            await updateRoomPlayers(redisClient, roomCode, players);
        }

        socket.emit('room:joined', {
            roomCode,
            quizName: roomData.quiz_name || roomData.subject_name || '',
            players,
            playerCount: players.length
        });
    });

    socket.on('room:join', async ({ roomCode, userId, username }) => {
      const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
      if (!roomData || !roomData.type) {
        socket.emit('room:error', { message: 'Room not found' });
        return;
      }
      if (roomData.status !== 'waiting' && roomData.status !== 'active') {
        socket.emit('room:error', { message: 'Quiz already finished' });
        return;
      }
      if (roomData.host_id === userId && roomData.type !== '1v1') {
        socket.emit('room:error', { message: 'Host cannot join as participant. Please use host screen.' });
        return;
      }

      let players = JSON.parse(roomData.players || '[]');
      const alreadyJoined = players.find(p => p.userId === userId);
      if (!alreadyJoined) {
        players.push({ userId, username, socketId: socket.id, score: 0, answered: false });
        await updateRoomPlayers(redisClient, roomCode, players);
      } else {
        // Update socket ID even if already in array (relevant for 1v1 where players are pre-filled)
        const pIndex = players.findIndex(p => p.userId === userId);
        players[pIndex].socketId = socket.id;
        await updateRoomPlayers(redisClient, roomCode, players);
      }

      socket.join(roomCode);
      socket.roomCode = roomCode;
      socket.userId = userId;
      socket.username = username;

      const hostSocketId = roomData.host_socket;
      if (hostSocketId && hostSocketId !== socket.id) {
        io.to(hostSocketId).emit('room:player_joined', { 
          players,
          newPlayer: { userId, username }
        });
      }

      // Update everyone else in the room
      io.to(roomCode).emit('room:players', { players });

      // AUTO-START 1v1: Wait for both players to have active socket connections
      if (roomData.type === '1v1' && players.length === 2 && roomData.status === 'waiting') {
        const bothConnected = players.every(p => p.socketId && p.socketId !== '');
        if (bothConnected) {
            // Give 2.5s for components to mount and register listeners
            setTimeout(async () => {
              const currentStatus = await redisClient.hGet('gnosis:room:' + roomCode, 'status');
              if (currentStatus === 'waiting') {
                 await redisClient.hSet('gnosis:room:' + roomCode, 'status', 'active');
                 
                 const qs = JSON.parse(roomData.questions || '[]');
                 io.to(roomCode).emit('quiz:starting', { 
                   message: 'Battle starting in 3 seconds!',
                   totalQuestions: qs.length
                 });

                 setTimeout(() => {
                   sendNextQuestion(io, redisClient, roomCode);
                 }, 3000);
              }
            }, 2500);
        }
      }

      socket.emit('room:joined', {
        roomCode,
        quizName: roomData.quiz_name || roomData.subject_name || '',
        players,
        playerCount: players.length
      });
    });

    socket.on('host:start_quiz', async ({ roomCode }) => {
      const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
      if (roomData.host_socket !== socket.id) {
        socket.emit('quiz:error', { message: 'Not the host' });
        return;
      }
      const players = JSON.parse(roomData.players || '[]');
      if (players.length < 1) { // Changed to 1 so you can test it easily
        socket.emit('quiz:error', { message: 'Need at least 1 player' });
        return;
      }

      await redisClient.hSet('gnosis:room:' + roomCode, 'status', 'active');
      
      io.to(roomCode).emit('quiz:starting', { 
        message: 'Quiz starting in 3 seconds',
        totalQuestions: JSON.parse(roomData.questions).length
      });

      setTimeout(() => {
        sendNextQuestion(io, redisClient, roomCode);
      }, 3000);
    });

    socket.on('quiz:answer', async ({ roomCode, questionId, selectedOptions }) => {
      const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
      if (!roomData || roomData.status !== 'active') return;

      const qSentAt = parseInt(roomData.q_sent_at);
      const now = Date.now();
      const questions = JSON.parse(roomData.questions);
      const currentIndex = parseInt(roomData.current_index);
      const currentQuestion = questions[currentIndex];
      const allowedMs = (currentQuestion.timer_seconds || 15) * 1000;

      if (now - qSentAt > allowedMs + 2000) { // 2s grace period
        socket.emit('quiz:answer_rejected', { reason: 'timeout', questionId });
        return;
      }

      // ROBUST ANSWER VERIFICATION
      const normalize = (arr) => {
        if (!arr || !Array.isArray(arr)) return [];
        return arr.map(v => String(v).trim().toLowerCase()).sort();
      };

      const correctOptions = currentQuestion.correct_options || [];
      const normalizedSelected = normalize(selectedOptions);
      const normalizedCorrect = normalize(correctOptions);
      
      const isCorrect = normalizedSelected.length === normalizedCorrect.length && 
                        normalizedSelected.every((val, index) => val === normalizedCorrect[index]);

      let xpEarned = 0;
      if (isCorrect) {
        const isMulti = currentQuestion.question_type === 'multi_correct';
        xpEarned = isMulti ? 15 : 10;
        const timeTaken = now - qSentAt;
        if (timeTaken < 5000) xpEarned += 5;
        else if (timeTaken < 8000) xpEarned += 2;
      }

      const players = JSON.parse(roomData.players);
      const playerIndex = players.findIndex(p => p.userId === socket.userId);
      if (playerIndex !== -1) {
        players[playerIndex].score += xpEarned;
        players[playerIndex].answered = true;
        await updateRoomPlayers(redisClient, roomCode, players);
      }

      socket.emit('quiz:answer_result', {
        correct: isCorrect,
        xpEarned,
        correctOptions,
        explanation: currentQuestion.explanation || '',
        questionId
      });

      // Filter out disconnected or inactive players before deciding if everyone answered
      // Fix: Don't rely on io.sockets.sockets.has() as it might not be fully accurate, just check all players
      const allAnswered = players.every(p => p.answered);

      if (allAnswered) {
        const nextIndex = currentIndex + 1;
        await redisClient.hSet('gnosis:room:' + roomCode, 'current_index', nextIndex.toString());
        if (nextIndex >= questions.length) {
          await endQuiz(io, redisClient, roomCode);
        } else {
          sendNextQuestion(io, redisClient, roomCode);
        }
      }
    });

    socket.on('disconnect', async () => {
      if (socket.userId) {
        await redisClient.del('gnosis:socket:' + socket.userId);
      }
    });
  });
};
