require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { origin: '*', methods: ['GET','POST'] } 
});

const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');

    // Load Socket handlers
    require('./socket/handlers')(io, redisClient);

    // Load REST routes
    const notificationRoutes = require('./routes/notifications')(redisClient);
    app.use('/notifications', notificationRoutes);

    // Health endpoint
    app.get('/health', (req, res) => {
      res.json({ status: "ok", service: "notification-service" });
    });

    server.listen(PORT, () => {
      console.log(`Notification service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
