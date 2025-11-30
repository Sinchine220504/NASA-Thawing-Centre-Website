import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nasa_thawing_centre',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  adminDefaultEmail: process.env.ADMIN_EMAIL || 'admin@nasa-thawing.com',
  adminDefaultPassword: process.env.ADMIN_PASSWORD || 'ChangeMe#123',
};


