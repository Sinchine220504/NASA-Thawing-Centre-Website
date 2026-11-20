import { Customer } from '../models/Customer.js';
import { Booking } from '../models/Booking.js';
import { crud } from './crud.factory.js';

export const customerCrud = crud(Customer, {
  label: 'Customer',
  fields: ['name', 'phone', 'email', 'address', 'notes'],
  searchFields: ['name', 'phone', 'email', 'address'],
  sort: { lastBookingAt: -1, createdAt: -1 },
});

export const customerBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.params.id }).sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, bookings });
};
