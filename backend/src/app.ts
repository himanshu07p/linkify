import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';

import { errorHandler, notFound } from './middleware/errorHandler';
import urlRoutes from './routes/urls';
import redirectRoutes from './routes/redirect';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3002;

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

// API routes
app.use('/api/urls', urlRoutes);
app.use('/api/redirect', redirectRoutes);

// Alternative stats route
app.use('/api/stats', redirectRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Export the app for Vercel
export default app;

// Only start server in development/local environment
const startServer = async () => {
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    try {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/health`);
        console.log(`🔗 API docs: http://localhost:${PORT}/api`);
      });
    } catch (error) {
      console.error('❌ Error starting server:', error);
      process.exit(1);
    }
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Only start server if not in Vercel
startServer();
