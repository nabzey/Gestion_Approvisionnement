const { createApp } = require('./app');
const { prisma } = require('./config/db');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

let server;

const startServer = async () => {
  try {
    const app = await createApp();

    server = app.listen(PORT, HOST, () => {
      console.log(`
Supply Chain Management API`);
      console.log(` Environment: ${process.env.NODE_ENV}`);
      console.log(` Swagger docs at http://${HOST}:${PORT}/api-docs`);
   
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      if (server) {
        server.close(async () => {
          await prisma.$disconnect();
          console.log('Database connection closed');
          process.exit(0);
        });
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      if (server) {
        server.close(() => process.exit(1));
      }
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      if (server) {
        server.close(() => process.exit(1));
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();

module.exports = { startServer };
