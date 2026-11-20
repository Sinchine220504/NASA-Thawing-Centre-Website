import mongoose from 'mongoose';
import { createApp } from './app.js';
import { config } from './config.js';
import { seedDefaults } from './utils/seed.js';
import { logger } from './utils/logger.js';

async function start() {
  try {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    logger.info('✅ MongoDB connected');
    await seedDefaults();

    const app = createApp();
    const server = app.listen(config.port, () => {
      logger.info(`🚀 API running on http://localhost:${config.port}`);
    });

    const shutdown = async () => {
      server.close();
      await mongoose.disconnect();
      process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    logger.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
