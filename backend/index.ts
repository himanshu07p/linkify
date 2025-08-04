import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';

import { errorHandler, notFound } from './src/middleware/errorHandler';
import urlRoutes from './src/routes/urls';
import redirectRoutes from './src/routes/redirect';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env['FRONTEND_URL'] || 'http://localhost:3000',
  credentials: true
}));

// General middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    success: true, 
    message: 'Linkify API is running!',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Linkify API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      createUrl: 'POST /api/urls',
      getUrls: 'GET /api/urls',
      redirect: 'GET /api/redirect/:shortCode',
      stats: 'GET /api/stats/:shortCode'
    }
  });
});

// API routes
app.use('/api/urls', urlRoutes);
app.use('/api/redirect', redirectRoutes);
app.use('/api/stats', redirectRoutes);

// 404 handler
app.use(notFound);
app.use(errorHandler);

// Export for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
