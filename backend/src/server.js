import mongoose from 'mongoose';
import { createApp } from './app.js';
import { config } from './config.js';

async function start() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');

    const app = createApp();
    app.listen(config.port, () => {
      console.log(`🚀 Backend running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
