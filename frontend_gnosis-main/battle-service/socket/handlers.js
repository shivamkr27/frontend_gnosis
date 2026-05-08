const axios = require('axios');
const { generateRoomCode, updateRoomPlayers, sendNextQuestion, endQuiz } = require('../helpers/room');

module.exports = (io, redisClient) => {
  io.on('connection', (socket) => {
    
    // User identifies themselves after connecting
    socket.on('user:identify', async ({ userId, username }) => {
      socket.userId = userId;
      socket.username = username;
      // Store socket mapping in Redis
      await redisClient.set('gnosis:socket:' + userId, socket.id, { EX: 3600 });
    });

    // ---- 1v1 CHALLENGE EVENTS ----
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
        const res = await axios.get(`http://localhost:3002/content/levels/${levelId}/questions/gemini`);
        questions = res.data;
      } catch (err) {
        socket.emit('battle:error', { message: 'Failed to generate questions' });
        return;
      }

      const challengerUsername = await redisClient.get('gnosis:socket:' + fromUserId) ? 'challenger' : 'challenger'; // Real name should ideally come from Redis challenge state, but using placeholder

      const players = [
        { userId: fromUserId, username: challengerUsername, socketId: challengerSocketId, score: 0, answered: false },
        { userId: socket.userId, username: socket.username, socketId: socket.id, score: 0, answered: false }
      ];

      await redisClient.hSet('gnosis:room:' + roomCode, {
        type: '1v1',
        host_id: fromUserId,
        host_socket: challengerSocketId || '',
        subject_id: subjectId,
        level_id: levelId,
        subject_name: subjectName || '',
        level_number: levelNumber ? levelNumber.toString() : '',
        status: 'waiting',
        questions: JSON.stringify(questions),
        current_index: '0',
        q_sent_at: '0',
        players: JSON.stringify(players)
      });
      await redisClient.expire('gnosis:room:' + roomCode, 3600);

      socket.join(roomCode);
      if (challengerSocketId) {
        // Technically, challenger isn't in the socket room automatically since they didn't join from their client yet.
        // We can just tell their client to emit a room:join event or add them if we use Redis PubSub.
        // Using emit to tell challenger to join
        io.to(challengerSocketId).emit('challenge:accepted', { roomCode, subjectName: subjectId });
      }
      socket.emit('challenge:accepted', { roomCode });

      setTimeout(() => {
        redisClient.hSet('gnosis:room:' + roomCode, 'status', 'active');
        sendNextQuestion(io, redisClient, roomCode);
      }, 3000);
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

    socket.on('room:join', async ({ roomCode, userId, username }) => {
      const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
      if (!roomData || !roomData.type) {
        socket.emit('room:error', { message: 'Room not found' });
        return;
      }
      if (roomData.status !== 'waiting') {
        socket.emit('room:error', { message: 'Quiz already started' });
        return;
      }
      if (roomData.host_id === userId) {
        socket.emit('room:error', { message: 'Host cannot join as participant' });
        return;
      }

      const players = JSON.parse(roomData.players || '[]');
      const alreadyJoined = players.find(p => p.userId === userId);
      if (!alreadyJoined) {
        players.push({ userId, username, socketId: socket.id, score: 0, answered: false });
        await updateRoomPlayers(redisClient, roomCode, players);
      }

      socket.join(roomCode);
      socket.roomCode = roomCode;

      const hostSocketId = roomData.host_socket;
      if (hostSocketId) {
        io.to(hostSocketId).emit('room:player_joined', { 
          players,
          newPlayer: { userId, username }
        });
      }

      socket.emit('room:joined', {
        roomCode,
        quizName: roomData.quiz_name || '',
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
      if (players.length < 2) {
        socket.emit('quiz:error', { message: 'Need at least 2 players' });
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
      const allowedMs = currentQuestion.timer_seconds * 1000;

      if (now - qSentAt > allowedMs) {
        socket.emit('quiz:answer_rejected', { reason: 'timeout', questionId });
        return;
      }

      const correctOptions = currentQuestion.correct_options || [];
      const sortedSelected = [...selectedOptions].sort();
      const sortedCorrect = [...correctOptions].sort();
      const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);

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
