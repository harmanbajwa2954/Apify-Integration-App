// File: backend/index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later'
});

// Apply rate limiting to all endpoints
app.use(apiLimiter);

// Validate API key middleware
const validateApiKey = (req, res, next) => {
  const { apiKey } = req.body;
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
    return res.status(400).json({ error: 'Valid API key is required' });
  }
  next();
};

// Centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  res.status(500).json({ error: 'Internal server error' });
};

// Endpoint to fetch list of actors
app.post('/actors', validateApiKey, async (req, res, next) => {
  try {
    const { apiKey } = req.body;
    const response = await axios.get('https://api.apify.com/v2/acts', {
      headers: { Authorization: `Bearer ${apiKey}` },
      timeout: 10000 // 10 seconds timeout
    });
    
    if (!response.data?.data?.items) {
      throw new Error('Invalid response structure from Apify API');
    }
    
    res.status(200).json({ actors: response.data.data.items });
  } catch (error) {
    next(error);
  }
});

// Endpoint to get actor schema
app.post('/actor-schema', validateApiKey, async (req, res, next) => {
  try {
    const { apiKey, actorId } = req.body;
    
    if (!actorId || typeof actorId !== 'string') {
      return res.status(400).json({ error: 'Valid actorId is required' });
    }

    const response = await axios.get(
      `https://api.apify.com/v2/acts/${encodeURIComponent(actorId)}/input-schema`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        timeout: 10000
      }
    );

    res.status(200).json({ schema: response.data });
  } catch (error) {
    next(error);
  }
});

// Endpoint to run an actor
app.post('/run-actor', validateApiKey, async (req, res, next) => {
  try {
    const { apiKey, actorId, input } = req.body;
    
    if (!actorId || typeof actorId !== 'string') {
      return res.status(400).json({ error: 'Valid actorId is required' });
    }
    
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      return res.status(400).json({ error: 'Input must be a valid JSON object' });
    }

    const response = await axios.post(
      `https://api.apify.com/v2/acts/${encodeURIComponent(actorId)}/runs`,
      input,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 seconds timeout
      }
    );

    res.status(200).json({ run: response.data });
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Apify backend is running.');
});

// Apply error handler
app.use(errorHandler);

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});