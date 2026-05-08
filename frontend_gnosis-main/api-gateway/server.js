require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const authenticateToken = require('./middleware/auth');
const answerTimingMiddleware = require('./middleware/timing');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy required for rate limiter if behind a load balancer
app.set('trust proxy', 1);

// 1. helmet()
app.use(helmet());

// 2. cors()
app.use(cors({
  origin: 'http://localhost:5173'
}));

// 3. express.json()
app.use(express.json());

// 4. General rate limiter (all routes)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: "Too many requests" }
});
app.use(generalLimiter);

// 5. authenticateToken (all routes)
app.use(authenticateToken);

// 6. answerTimingMiddleware (only answer route)
app.use(answerTimingMiddleware);

// 7. Quiz answer rate limiter (only answer route)
const quizAnswerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: { error: "Too many answer requests" }
});
app.use('/content/levels/*/answer', quizAnswerLimiter);

// 8. Proxy routes
app.use('/auth', createProxyMiddleware({ 
  target: process.env.AUTH_SERVICE,
  changeOrigin: true 
}));

app.use('/content', createProxyMiddleware({ 
  target: process.env.CONTENT_SERVICE,
  changeOrigin: true 
}));

app.use('/progress', createProxyMiddleware({ 
  target: process.env.PROGRESS_SERVICE,
  changeOrigin: true 
}));

app.use('/xp', createProxyMiddleware({ 
  target: process.env.XP_SERVICE,
  changeOrigin: true 
}));

app.use('/battle', createProxyMiddleware({ 
  target: process.env.BATTLE_SERVICE,
  changeOrigin: true 
}));

app.use('/notifications', createProxyMiddleware({ 
  target: process.env.NOTIFICATION_SERVICE,
  changeOrigin: true 
}));

// Health route (authenticateToken skips this)
app.get('/health', (req, res) => {
  res.json({ 
    status: "ok", 
    service: "api-gateway",
    services: {
      auth: process.env.AUTH_SERVICE,
      content: process.env.CONTENT_SERVICE,
      progress: process.env.PROGRESS_SERVICE,
      xp: process.env.XP_SERVICE,
      battle: process.env.BATTLE_SERVICE,
      notification: process.env.NOTIFICATION_SERVICE
    }
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
