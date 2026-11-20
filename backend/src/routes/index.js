import { Router } from 'express';
import bookingRoutes from './booking.routes.js';
import serviceRoutes from './service.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.get('/', (_req, res) =>
  res.json({
    name: 'NASA Thawing Centre API',
    public: ['GET /api/services', 'POST /api/bookings', 'GET /api/track/:code', 'GET /api/track/:code/stream (SSE)', 'POST /api/contact'],
    admin: ['/api/auth/*', '/api/bookings', '/api/admin/{services,technicians,customers,messages}', '/api/admin/reports/summary'],
  })
);

router.use(bookingRoutes);
router.use(serviceRoutes);
router.use(authRoutes);
router.use(adminRoutes);

export default router;
