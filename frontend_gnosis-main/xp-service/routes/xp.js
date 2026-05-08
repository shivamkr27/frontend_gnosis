const express = require('express');
const router = express.Router();
const pool = require('../db/index');

module.exports = (redisClient) => {
  // POST /xp/award
  router.post('/award', async (req, res) => {
    const { userId, username, amount, source, scope, roomId } = req.body;

    try {
      await pool.query(
        `INSERT INTO xp_ledger (user_id, username, amount, source, scope, room_id)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, username, amount, source, scope, roomId]
      );

      if (scope === 'global') {
        const member = `${userId}:${username}`;
        await redisClient.zIncrBy('gnosis:leaderboard:global', amount, member);
      }

      res.status(201).json({ message: 'XP awarded', amount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /xp/leaderboard/global
  router.get('/leaderboard/global', async (req, res) => {
    try {
      const { currentUserId } = req.query;
      
      const results = await redisClient.zRevRangeWithScores('gnosis:leaderboard:global', 0, 19);
      
      const leaderboard = results.map((result, index) => {
        const [userId, username] = result.value.split(':');
        return {
          rank: index + 1,
          userId,
          username,
          xp: result.score
        };
      });

      const response = { leaderboard };

      if (currentUserId) {
        // Need to find the member string for currentUserId. This might be tricky if we don't know the username.
        // Assuming currentUserId contains the username as well or we find it in DB. 
        // Wait, the prompt says ZREVRANK gnosis:leaderboard:global "{userId}:{username}".
        // We will query the DB to get the username if needed, or assume currentUserId comes with username if needed.
        // But let's check if the query can just provide the full member string, or if we need to search it.
        // For simplicity, let's query the DB for the username.
        const userRes = await pool.query('SELECT username FROM xp_ledger WHERE user_id = $1 LIMIT 1', [currentUserId]);
        if (userRes.rows.length > 0) {
          const member = `${currentUserId}:${userRes.rows[0].username}`;
          const rank = await redisClient.zRevRank('gnosis:leaderboard:global', member);
          if (rank !== null) {
            response.currentUserRank = rank + 1;
          }
        }
      }

      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /xp/leaderboard/friends
  router.get('/leaderboard/friends', async (req, res) => {
    try {
      const { userId, friendIds } = req.query;
      
      if (!userId || !friendIds) {
        return res.status(400).json({ error: 'userId and friendIds query params required' });
      }

      const allIds = friendIds.split(',').map(id => id.trim());
      if (!allIds.includes(userId)) {
        allIds.push(userId);
      }

      const result = await pool.query(
        `SELECT user_id, username, SUM(amount) as total_xp
         FROM xp_ledger
         WHERE scope = 'global'
         AND user_id = ANY($1::uuid[])
         GROUP BY user_id, username
         ORDER BY total_xp DESC`,
        [allIds]
      );

      const ranked = result.rows.map((row, index) => ({
        rank: index + 1,
        userId: row.user_id,
        username: row.username,
        totalXp: parseInt(row.total_xp, 10)
      }));

      res.json(ranked);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /xp/user/:userId/total
  router.get('/user/:userId/total', async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await pool.query(
        `SELECT COALESCE(SUM(amount), 0) as total
         FROM xp_ledger
         WHERE user_id = $1 AND scope = 'global'`,
        [userId]
      );
      
      res.json({
        userId,
        totalXp: parseInt(result.rows[0].total, 10)
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /xp/user/:userId/history
  router.get('/user/:userId/history', async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await pool.query(
        `SELECT amount, source, scope, awarded_at
         FROM xp_ledger
         WHERE user_id = $1
         ORDER BY awarded_at DESC
         LIMIT 20`,
        [userId]
      );
      
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
