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
        // We attempt to get gemini questions first, if it fails, fallback to standard subject questions
        try {
            const res = await axios.get(`http://content-service:3002/content/levels/${levelId}/questions/gemini`);
            questions = res.data;
        } catch (err) {
            console.log("Gemini fallback... fetching standard random questions.");
            // Determine level ID from subject if a dummy was passed
            let targetLevelId = levelId;
            if(levelId === "dummy-level-id") {
                const subRes = await axios.get(`http://content-service:3002/content/subjects/${subjectId}`);
                targetLevelId = subRes.data.levels[0].id; // Fallback to first level of subject
            }
            const stdRes = await axios.get(`http://content-service:3002/content/levels/${targetLevelId}/questions`);
            questions = stdRes.data;
        }
      } catch (err) {
        socket.emit('battle:error', { message: 'Failed to generate questions' });
        return;
      }

      const challengerUsername = await redisClient.get('gnosis:challenge:' + socket.userId).then(res => res ? JSON.parse(res).fromUsername : 'Challenger');

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
        io.to(challengerSocketId).emit('challenge:accepted', { roomCode, subjectName });
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

    socket.on('room:host_join', async ({ roomCode, userId, username }) => {
        socket.join(roomCode);
        socket.roomCode = roomCode;
        socket.userId = userId;
        socket.username = username;

        // Ensure host socket is updated in Redis room data if reconnected
        await redisClient.hSet('gnosis:room:' + roomCode, 'host_socket', socket.id);

        const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
        const players = JSON.parse(roomData.players || '[]');
        socket.emit('room:joined', {
            roomCode,
            quizName: roomData.quiz_name || '',
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
      if (roomData.status !== 'waiting') {
        socket.emit('room:error', { message: 'Quiz already started' });
        return;
      }
      if (roomData.host_id === userId) {
        socket.emit('room:error', { message: 'Host cannot join as participant. Please use host screen.' });
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

      // Update everyone else in the room
      io.to(roomCode).emit('room:players', { players });

      socket.emit('room:joined', {
        roomCode,
        quizName: roomData.quiz_name || '',
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

      // Filter out disconnected or inactive players before deciding if everyone answered
      const activePlayers = players.filter(p => io.sockets.sockets.has(p.socketId));
      const allAnswered = activePlayers.every(p => p.answered);

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
