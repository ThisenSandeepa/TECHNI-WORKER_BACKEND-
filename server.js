/**
 * Techni Worker Backend - Server Entry Point
 */

const app = require('./src/app');

const BASE_PORT = Number(process.env.PORT) || 5000;
let currentPort = BASE_PORT;
let server;

const startServer = (port) => {
  server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.log(`⚠️ Port ${port} is already in use. Retrying on port ${nextPort}...`);
      currentPort = nextPort;
      startServer(nextPort);
      return;
    }

    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  });
};

startServer(currentPort);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  if (!server) {
    process.exit(0);
  }

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});