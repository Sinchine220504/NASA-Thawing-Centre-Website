import { Booking } from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { fullName, phoneNumber, location, serviceType, issueDescription } = req.body;
    const booking = await Booking.create({
      fullName,
      phoneNumber,
      location,
      serviceType,
      issueDescription,
    });
    return res.status(201).json({ success: true, booking });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const getBookings = async (_req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  return res.json({ success: true, bookings });
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ['Pending', 'Accepted', 'Completed'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }
  const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
  if (!booking) return res.status(404).json({ success: false, message: 'Not found' });
  return res.json({ success: true, booking });
};


