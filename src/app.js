/**
 * Techni Worker Backend - Express App Configuration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/database');
const workerRoutes = require('./routes/workerRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// ============ Middleware ============
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ Initialize Database ============
connectDB();

// ============ Routes ============
app.use('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date() 
  });
});

app.use('/api/workers', workerRoutes);

// ============ 404 Handler ============
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.path 
  });
});

// ============ Error Handling Middleware (must be last) ============
app.use(errorHandler);

module.exports = app;