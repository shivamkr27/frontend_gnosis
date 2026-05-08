require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createClient } = require('redis');
const setupSocketHandlers = require('./socket/handlers');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { origin: '*', methods: ['GET','POST'] } 
});

const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

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
    
    // Setup Database logic checks by requiring the pool which connects automatically
    // The db/index.js will print 'Connected to PostgreSQL'
    require('./db/index');
    
    // Setup Socket IO handlers
    setupSocketHandlers(io, redisClient);

    // Load REST routes
    const battleRoutes = require('./routes/battle')(redisClient);
    
    // We attach routes at root for health, or /battle for specific. The prompt specifies GET /battle/history and GET /health
    app.use('/battle', battleRoutes);
    // Add health route to root as well just in case
    app.get('/health', (req, res) => {
      res.json({ status: "ok", service: "battle-service" });
    });

    server.listen(PORT, () => {
      console.log(`Battle service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
