import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import bookingRoutes from './routes/booking.routes.js';
import serviceRoutes from './routes/service.routes.js';
import authRoutes from './routes/auth.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan('dev'));

  // Static assets for admin UI
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // Views (EJS) for basic admin dashboard
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api', bookingRoutes);
  app.use('/api', serviceRoutes);
  app.use('/api', authRoutes);

  // Admin pages
  app.get('/admin', (_req, res) => res.render('login', { title: 'Admin Login' }));
  app.get('/admin/dashboard', (_req, res) => res.render('admin', { title: 'Admin Dashboard' }));

  return app;
};


