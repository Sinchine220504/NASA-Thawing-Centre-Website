import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

export const createApp = () => {
  const app = express();
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: (origin, cb) => {
        // Allow same-origin / server-to-server (no Origin header) and configured frontends
        // Unknown origins get no CORS headers, so browsers block them
        cb(null, !origin || config.clientOrigins.includes(origin) || config.clientOrigins.includes('*'));
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true }));
  if (config.env !== 'test') app.use(morgan('dev'));

  // Throttle public write endpoints to limit spam
  const publicWriteLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });
  app.use(['/api/bookings', '/api/book', '/api/contact', '/api/auth/login'], (req, res, next) =>
    req.method === 'POST' ? publicWriteLimiter(req, res, next) : next()
  );

  app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
  app.get('/', (_req, res) => res.json({ name: 'NASA Thawing Centre API', docs: '/api', health: '/health' }));

  app.use('/api', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
};
