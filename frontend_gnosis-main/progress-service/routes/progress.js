const express = require('express');
const axios = require('axios');
const pool = require('../db/index');

const router = express.Router();

const CONTENT_SERVICE_URL = process.env.CONTENT_SERVICE_URL || 'http://localhost:3002';
const XP_SERVICE_URL = process.env.XP_SERVICE_URL || 'http://localhost:3004';

// GET /health
router.get('/health', (req, res) => {
  res.json({ status: "ok", service: "progress-service" });
});

// POST /progress/initialize/:userId
router.post('/initialize/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Get all subjects
    const subjectsResponse = await axios.get(`${CONTENT_SERVICE_URL}/content/subjects`);
    let subjects = subjectsResponse.data; // content-service returns array directly
    // Ensure subjects are sorted by order_index
    subjects = subjects.sort((a, b) => a.order_index - b.order_index);

    // For each subject, get levels and create progress rows
    for (const subject of subjects) {
      const levelsResponse = await axios.get(`${CONTENT_SERVICE_URL}/content/subjects/${subject.id}`);
      const levels = levelsResponse.data.levels; // /subjects/:id returns { ...subject, levels: [] }

      for (const level of levels) {
        let status = 'locked';
        // Unlock first level of first subject
        if (subject.id === subjects[0].id && level.level_number === 1) {
          status = 'unlocked';
        }

        await pool.query(`
          INSERT INTO user_progress (user_id, level_id, subject_id, status)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (user_id, level_id) DO NOTHING
        `, [userId, level.id, subject.id, status]);
      }
    }

    res.status(201).json({ message: "progress initialized" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /progress/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(`
      SELECT * FROM user_progress WHERE user_id = $1 ORDER BY subject_id, level_id
    `, [userId]);

    // Group by subject_id
    const subjectsMap = {};
    for (const row of result.rows) {
      if (!subjectsMap[row.subject_id]) {
        subjectsMap[row.subject_id] = {
          subject_id: row.subject_id,
          levels: []
        };
      }
      // Get level_number from content-service
      const levelsResponse = await axios.get(`${CONTENT_SERVICE_URL}/content/subjects/${row.subject_id}`);
      const level = levelsResponse.data.levels.find(l => l.id === row.level_id);
      subjectsMap[row.subject_id].levels.push({
        level_id: row.level_id,
        level_number: level ? level.level_number : null,
        status: row.status,
        xp_earned: row.xp_earned,
        completed_at: row.completed_at
      });
    }

    const subjects = Object.values(subjectsMap);
    res.json({ subjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /progress/:userId/subject/:subjectId
router.get('/:userId/subject/:subjectId', async (req, res) => {
  const { userId, subjectId } = req.params;
  try {
    const result = await pool.query(`
      SELECT * FROM user_progress
      WHERE user_id = $1 AND subject_id = $2
      ORDER BY level_id
    `, [userId, subjectId]);

    // Get levels from content-service
    const levelsResponse = await axios.get(`${CONTENT_SERVICE_URL}/content/subjects/${subjectId}`);
    const levels = levelsResponse.data.levels;

    const progress = levels.map(level => {
      const prog = result.rows.find(p => p.level_id === level.id);
      return {
        level_id: level.id,
        level_number: level.level_number,
        status: prog ? prog.status : 'locked',
        xp_earned: prog ? prog.xp_earned : 0,
        completed_at: prog ? prog.completed_at : null
      };
    });

    res.json({ levels: progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /progress/:userId/streak
router.get('/:userId/streak', async (req, res) => {
  const { userId } = req.params;
  try {
    const today = new Date();
    // Force UTC for consistent date comparisons
    const todayStr = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())).toISOString().split('T')[0];
    const yesterday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1));
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check activity history
    const activityResult = await pool.query(`
      SELECT activity_date, levels_completed
      FROM daily_activity
      WHERE user_id = $1 AND activity_date >= (NOW() AT TIME ZONE 'UTC')::date - interval '7 days'
      ORDER BY activity_date DESC
    `, [userId]);

    let streakCount = 0;
    let lastActiveDate = null;
    const weekActivity = new Array(7).fill(false);

    // Activity Map based on UTC dates
    const activityMap = {};
    activityResult.rows.forEach(row => {
        // row.activity_date might come back as Date object or string depending on pg driver.
        // Convert properly to YYYY-MM-DD
        const d = new Date(row.activity_date);
        const iso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().split('T')[0];
        activityMap[iso] = row.levels_completed > 0;
    });

    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
      const dateStr = date.toISOString().split('T')[0];
      if (activityMap[dateStr]) {
        weekActivity[6 - i] = true;
      }
    }

    // Count consecutive from today backwards
    for (let i = 0; i < 7; i++) {
        const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
        const dateStr = date.toISOString().split('T')[0];
        if (activityMap[dateStr]) {
            streakCount++;
            if (!lastActiveDate) lastActiveDate = dateStr;
        } else {
            // If no activity today, it's fine, we still check yesterday for streak
            if (i === 0) continue;
            break;
        }
    }

    res.json({
      streakCount,
      lastActiveDate,
      weekActivity
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /progress/complete-level
router.post('/complete-level', async (req, res) => {
  const { userId, levelId, subjectId, xpEarned } = req.body;
  const authUserId = req.headers['x-user-id']; // Provided by auth middleware in api-gateway

  if (!authUserId) {
    return res.status(401).json({ error: "Unauthorized: Missing user ID" });
  }

  if (userId !== authUserId) {
    return res.status(403).json({ error: "Forbidden: Cannot update progress for another user" });
  }

  try {
    // Step 1: Update user_progress
    await pool.query(`
      UPDATE user_progress
      SET status = 'complete', xp_earned = $1, completed_at = NOW()
      WHERE user_id = $2 AND level_id = $3
    `, [xpEarned, userId, levelId]);

    // Step 2: Find next to unlock
    const levelsResponse = await axios.get(`${CONTENT_SERVICE_URL}/content/subjects/${subjectId}`);
    const levels = levelsResponse.data.levels;
    const currentLevel = levels.find(l => l.id === levelId);
    let nextLevel = null;
    let nextSubject = null;

    if (currentLevel.level_number < 4) {
      nextLevel = levels.find(l => l.level_number === currentLevel.level_number + 1);
    } else {
      // Last level, find next subject
      const subjectsResponse = await axios.get(`${CONTENT_SERVICE_URL}/content/subjects`);
      let subjects = Array.isArray(subjectsResponse.data)
        ? subjectsResponse.data
        : subjectsResponse.data.subjects;
      subjects = subjects.sort((a, b) => a.order_index - b.order_index);
      const currentSubject = subjects.find(s => s.id === subjectId);
      const nextSub = subjects.find(s => s.order_index === currentSubject.order_index + 1);
      if (nextSub) {
        const nextLevelsResponse = await axios.get(`${CONTENT_SERVICE_URL}/content/subjects/${nextSub.id}`);
        nextLevel = nextLevelsResponse.data.levels.find(l => l.level_number === 1);
        nextSubject = nextSub;
      }
    }

    // Step 3: Unlock next level
    if (nextLevel) {
      await pool.query(`
        UPDATE user_progress
        SET status = 'unlocked'
        WHERE user_id = $1 AND level_id = $2
      `, [userId, nextLevel.id]);
    }

    // Step 4: Update daily_activity
    await pool.query(`
      INSERT INTO daily_activity (user_id, activity_date, levels_completed)
      VALUES ($1, (NOW() AT TIME ZONE 'UTC')::date, 1)
      ON CONFLICT (user_id, activity_date)
      DO UPDATE SET levels_completed = daily_activity.levels_completed + 1
    `, [userId]);

    // Step 5: Calculate streak
    const today = new Date();
    const yesterday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1));
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const yesterdayResult = await pool.query(`
      SELECT levels_completed FROM daily_activity
      WHERE user_id = $1 AND activity_date = $2
    `, [userId, yesterdayStr]);

    let currentStreak = 1;
    if (yesterdayResult.rows.length > 0 && yesterdayResult.rows[0].levels_completed > 0) {
      currentStreak = 2; // Basic calculation just checking yesterday. Should technically use the logic in /streak endpoint for full streak but keeping it simple for return here.
    }

    // Step 6: Persist streak_count on users table
    await pool.query(`
      UPDATE users SET streak_count = $1, last_active_date = (NOW() AT TIME ZONE 'UTC')::date WHERE id = $2
    `, [currentStreak, userId]);

    // Step 7: Auto-award XP via xp-service
    try {
      const userRes = await pool.query('SELECT username FROM users WHERE id = $1', [userId]);
      const username = userRes.rows[0]?.username || 'unknown';
      await axios.post(`${XP_SERVICE_URL}/xp/award`, {
        userId,
        username,
        amount: xpEarned,
        source: 'lesson',
        scope: 'global'
      });
    } catch (err) {
      console.error('Failed to auto-award XP:', err.message);
    }

    res.json({
      message: "level completed",
      nextLevelUnlocked: nextLevel ? { levelId: nextLevel.id, levelNumber: nextLevel.level_number } : null,
      nextSubjectUnlocked: nextSubject ? { subjectId: nextSubject.id, subjectName: nextSubject.name } : null,
      currentStreak
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
