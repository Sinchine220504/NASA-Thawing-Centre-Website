import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nasa_thawing_centre',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  adminDefaultEmail: (process.env.ADMIN_EMAIL || 'admin@nasa-thawing.com').toLowerCase(),
  adminDefaultPassword: process.env.ADMIN_PASSWORD || 'ChangeMe#123',
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
};

if (config.env === 'production' && config.jwtSecret === 'dev_secret_change_me') {
  console.warn('⚠️  JWT_SECRET is not set — set it before deploying to production.');
}
