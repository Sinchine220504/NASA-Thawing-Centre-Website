import { Router } from 'express';
import {
  createBooking, trackBooking, streamBooking, listBookings, getBooking,
  updateBooking, deleteBooking, exportBookingsCsv,
} from '../controllers/booking.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public
router.post('/bookings', createBooking);
router.post('/book', createBooking); // legacy alias
router.get('/track/:code', trackBooking);
router.get('/track/:code/stream', streamBooking);

// Admin
router.get('/bookings', requireAuth, listBookings);
router.get('/bookings/export.csv', requireAuth, exportBookingsCsv);
router.get('/bookings/:id', requireAuth, getBooking);
router.patch('/bookings/:id', requireAuth, updateBooking);
router.patch('/bookings/:id/status', requireAuth, updateBooking); // legacy alias
router.delete('/bookings/:id', requireAuth, deleteBooking);

export default router;
