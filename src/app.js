const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { initSwagger } = require('./config/swagger');
const { connect } = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const routes = require('./routes');

const createApp = async () => {
  const app = express();

  // Connect to database
  await connect();

  // Middleware
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
  }));
  app.use(express.json({ limit: process.env.MAX_FILE_SIZE || '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: process.env.MAX_FILE_SIZE || '10mb' }));
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  // Swagger documentation
  await initSwagger(app);

  // Routes
  app.use('/', routes);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: '1.0.0'
    });
  });

  // 404 handler
  app.use(notFound);

  // Global error handler
  app.use(errorHandler.handle);

  return app;
};

module.exports = { createApp };
