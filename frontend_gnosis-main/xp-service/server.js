require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');
const setupCron = require('./cron/weeklyReset');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: "ok", service: "xp-service" });
});

// Setup Redis
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('Redis connection error', err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
    
    // Load routes
    const xpRoutes = require('./routes/xp')(redisClient);
    app.use('/xp', xpRoutes);

    // Load cron
    setupCron(redisClient);

    app.listen(PORT, () => {
      console.log(`XP service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
