import { Router } from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/booking.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/book', createBooking);
router.get('/bookings', requireAuth, getBookings);
router.patch('/bookings/:id/status', requireAuth, updateBookingStatus);

export default router;
