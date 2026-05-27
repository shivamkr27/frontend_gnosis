const crypto = require('crypto');
const pool = require('../db/index');
const axios = require('axios');

const generateRoomCode = async (redisClient) => {
  let code;
  let exists = true;
  while (exists) {
    code = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars
    const room = await redisClient.exists('gnosis:room:' + code);
    if (!room) exists = false;
  }
  return code;
};

const getRoomPlayers = async (redisClient, roomCode) => {
  const playersStr = await redisClient.hGet('gnosis:room:' + roomCode, 'players');
  return playersStr ? JSON.parse(playersStr) : [];
};

const updateRoomPlayers = async (redisClient, roomCode, players) => {
  await redisClient.hSet('gnosis:room:' + roomCode, 'players', JSON.stringify(players));
};

const endQuiz = async (io, redisClient, roomCode) => {
  const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
  if (!roomData || !roomData.players) return;

  const players = JSON.parse(roomData.players);
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const top3 = sortedPlayers.slice(0, 3);
  const is1v1 = roomData.type === '1v1';

  // Emit to entire room
  io.to(roomCode).emit('quiz:results', {
    top3: top3
  });

  // Emit full scoreboard to host
  if (roomData.host_socket) {
    io.to(roomData.host_socket).emit('quiz:full_scoreboard', {
      allPlayers: sortedPlayers
    });
  }

  // Award XP and Update Wins/Losses
  for (const player of players) {
    if (player.score > 0) {
      try {
        await axios.post('http://xp-service:3006/xp/award', {
          userId: player.userId,
          username: player.username,
          amount: player.score,
          source: 'battle',
          scope: 'global',
          roomId: roomCode
        });
      } catch (xpErr) {
        console.error(`Failed to award XP to ${player.username}:`, xpErr.message);
      }
    }
  }

  // Register Win/Loss for 1v1
  if (is1v1 && players.length === 2) {
    const winner = sortedPlayers[0];
    const loser = sortedPlayers[1];

    if (winner.score > loser.score) {
      try {
        await pool.query('UPDATE users SET battle_wins = battle_wins + 1 WHERE id = $1', [winner.userId]);
        await pool.query('UPDATE users SET battle_losses = battle_losses + 1 WHERE id = $1', [loser.userId]);
        console.log(`[Battle] Registered Win for ${winner.username}, Loss for ${loser.username}`);
      } catch (dbErr) {
        console.error('Failed to update win/loss stats:', dbErr.message);
      }
    }
  }

  // Save to DB
  try {
    await pool.query(
      `INSERT INTO battle_history (room_code, type, host_id, subject_name, level_number, participants, results)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        roomCode,
        roomData.type,
        roomData.host_id || null,
        roomData.subject_name || null,
        roomData.level_number ? parseInt(roomData.level_number) : null,
        JSON.stringify(players.map(p => ({ userId: p.userId, username: p.username }))),
        JSON.stringify(sortedPlayers)
      ]
    );
  } catch (err) {
    console.error('Error saving battle history', err);
  }

  // Delete from Redis after 5 mins
  setTimeout(async () => {
    await redisClient.del('gnosis:room:' + roomCode);
  }, 5 * 60 * 1000);

  await redisClient.hSet('gnosis:room:' + roomCode, 'status', 'complete');
};

const sendNextQuestion = async (io, redisClient, roomCode) => {
  const roomData = await redisClient.hGetAll('gnosis:room:' + roomCode);
  if (!roomData || !roomData.questions) return;

  const questions = JSON.parse(roomData.questions);
  const currentIndex = parseInt(roomData.current_index || '0');

  if (currentIndex >= questions.length) {
    await endQuiz(io, redisClient, roomCode);
    return;
  }

  const question = questions[currentIndex];
  
  // Remove correct options
  const questionWithoutCorrectOptions = { ...question };
  delete questionWithoutCorrectOptions.correct_options;
  delete questionWithoutCorrectOptions.explanation;

  const nowStr = Date.now().toString();
  await redisClient.hSet('gnosis:room:' + roomCode, 'q_sent_at', nowStr);

  // Reset players answered state
  const players = JSON.parse(roomData.players || '[]');
  players.forEach(p => p.answered = false);
  await updateRoomPlayers(redisClient, roomCode, players);

  io.to(roomCode).emit('quiz:question', {
    question: questionWithoutCorrectOptions,
    qIndex: currentIndex + 1,
    total: questions.length,
    timerSeconds: question.timer_seconds
  });

  // Auto-call next question
  const timeoutMs = (question.timer_seconds || 10) * 1000;
  
  // We attach the timeout so it can be cleared if everyone answers early
  const timeoutId = setTimeout(async () => {
    const currentData = await redisClient.hGetAll('gnosis:room:' + roomCode);
    if (currentData && currentData.status === 'active' && parseInt(currentData.current_index) === currentIndex) {
      await redisClient.hSet('gnosis:room:' + roomCode, 'current_index', (currentIndex + 1).toString());
      sendNextQuestion(io, redisClient, roomCode);
    }
  }, timeoutMs);
  
  // We don't have a reliable way to store complex timeout objects in Redis directly without stringifying, 
  // so we rely on current_index check within the timeout.
};

module.exports = {
  generateRoomCode,
  getRoomPlayers,
  updateRoomPlayers,
  sendNextQuestion,
  endQuiz
};
