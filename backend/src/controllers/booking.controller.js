import { Booking, BOOKING_STATUSES, PAYMENT_STATUSES } from '../models/Booking.js';
import { Customer } from '../models/Customer.js';
import { Service } from '../models/Service.js';
import { Technician } from '../models/Technician.js';
import { HttpError } from '../middleware/error.js';
import { bus, bookingChannel } from '../events.js';

const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => obj[k] !== undefined).map((k) => [k, obj[k]]));
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const publish = (booking) => bus.emit(bookingChannel(booking.code), booking.toPublic());

/* ---------- Public ---------- */

export const createBooking = async (req, res) => {
  const data = pick(req.body, [
    'fullName', 'phoneNumber', 'email', 'location', 'coordinates',
    'serviceType', 'vehicleType', 'vehicleNumber', 'issueDescription',
  ]);

  // Only accept active services when the catalogue is populated
  if ((await Service.estimatedDocumentCount()) > 0) {
    const ok = await Service.exists({ name: data.serviceType, isActive: true });
    if (!ok) throw new HttpError(400, 'Please choose a valid service');
  }

  const service = await Service.findOne({ name: data.serviceType }).lean();
  const booking = new Booking({ ...data, amount: service?.basePrice || 0, source: 'web' });

  const customer = await Customer.findOneAndUpdate(
    { phone: data.phoneNumber?.trim() },
    {
      $set: { name: data.fullName, ...(data.email ? { email: data.email } : {}), address: data.location, lastBookingAt: new Date() },
      $inc: { totalBookings: 1 },
    },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  );
  booking.customer = customer._id;
  await booking.save();

  res.status(201).json({ success: true, code: booking.code, booking: booking.toPublic() });
};

export const trackBooking = async (req, res) => {
  const booking = await Booking.findOne({ code: req.params.code.toUpperCase() }).populate('technician');
  if (!booking) throw new HttpError(404, 'No booking found with that tracking code');
  res.json({ success: true, booking: booking.toPublic() });
};

/** Server-Sent Events stream of live status updates for one booking. */
export const streamBooking = async (req, res) => {
  const code = req.params.code.toUpperCase();
  const booking = await Booking.findOne({ code }).populate('technician');
  if (!booking) throw new HttpError(404, 'No booking found with that tracking code');

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders();

  const send = (payload) => res.write(`event: update\ndata: ${JSON.stringify(payload)}\n\n`);
  send(booking.toPublic());

  const channel = bookingChannel(code);
  bus.on(channel, send);
  const ping = setInterval(() => res.write(': ping\n\n'), 25000);

  req.on('close', () => {
    clearInterval(ping);
    bus.off(channel, send);
  });
};

/* ---------- Admin ---------- */

export const listBookings = async (req, res) => {
  const { status, service, q, from, to } = req.query;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));

  const filter = {};
  if (status && status !== 'All') filter.status = status;
  if (service && service !== 'All') filter.serviceType = service;
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(new Date(to).setHours(23, 59, 59, 999));
  }
  if (q) {
    const rx = new RegExp(escapeRegex(String(q).trim()), 'i');
    filter.$or = [{ fullName: rx }, { phoneNumber: rx }, { code: rx }, { location: rx }, { vehicleNumber: rx }];
  }

  const [bookings, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate('technician', 'name phone status'),
    Booking.countDocuments(filter),
  ]);
  res.json({ success: true, bookings, total, page, pages: Math.ceil(total / limit) || 1 });
};

export const getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('technician').populate('customer');
  if (!booking) throw new HttpError(404, 'Booking not found');
  res.json({ success: true, booking });
};

export const updateBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new HttpError(404, 'Booking not found');

  const body = req.body || {};
  const previousTech = booking.technician ? String(booking.technician) : null;

  Object.assign(
    booking,
    pick(body, [
      'fullName', 'phoneNumber', 'email', 'location', 'serviceType', 'vehicleType',
      'vehicleNumber', 'issueDescription', 'adminNotes', 'amount', 'paymentRef',
    ])
  );

  if (body.paymentStatus !== undefined) {
    if (!PAYMENT_STATUSES.includes(body.paymentStatus)) throw new HttpError(400, 'Invalid payment status');
    booking.paymentStatus = body.paymentStatus;
  }

  if (body.technician !== undefined) {
    if (body.technician) {
      const tech = await Technician.findById(body.technician);
      if (!tech) throw new HttpError(400, 'Technician not found');
      booking.technician = tech._id;
      if (booking.status === 'Pending' && !body.status) body.status = 'Assigned';
    } else {
      booking.technician = undefined;
    }
  }

  if (body.etaMinutes !== undefined && body.etaMinutes !== '' && body.etaMinutes !== null) {
    booking.etaMinutes = Number(body.etaMinutes);
    booking.etaAt = new Date(Date.now() + booking.etaMinutes * 60000);
  }

  if (body.status && body.status !== booking.status) {
    if (!BOOKING_STATUSES.includes(body.status)) throw new HttpError(400, 'Invalid status');
    booking.status = body.status;
    booking.statusHistory.push({ status: body.status, note: body.note || undefined });
    if (body.status === 'Completed') booking.completedAt = new Date();
    if (['Arrived', 'In Progress', 'Completed', 'Cancelled'].includes(body.status)) booking.etaAt = undefined;
  }

  await booking.save();

  // Keep technician availability in sync
  const currentTech = booking.technician ? String(booking.technician) : null;
  if (previousTech && previousTech !== currentTech) await Technician.findByIdAndUpdate(previousTech, { status: 'Available' });
  if (currentTech) {
    const free = ['Completed', 'Cancelled'].includes(booking.status);
    await Technician.findByIdAndUpdate(currentTech, { status: free ? 'Available' : 'Busy' });
  }

  await booking.populate('technician');
  publish(booking);
  res.json({ success: true, booking });
};

export const deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) throw new HttpError(404, 'Booking not found');
  if (booking.technician && !['Completed', 'Cancelled'].includes(booking.status)) {
    await Technician.findByIdAndUpdate(booking.technician, { status: 'Available' });
  }
  res.json({ success: true });
};

export const exportBookingsCsv = async (_req, res) => {
  const rows = await Booking.find().sort({ createdAt: -1 }).populate('technician', 'name').lean();
  const cols = ['code', 'createdAt', 'fullName', 'phoneNumber', 'email', 'location', 'serviceType', 'vehicleType',
    'vehicleNumber', 'status', 'technician', 'amount', 'paymentStatus'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [cols.join(',')]
    .concat(rows.map((r) => cols.map((c) => esc(c === 'technician' ? r.technician?.name : c === 'createdAt' ? r.createdAt?.toISOString() : r[c])).join(',')))
    .join('\n');
  res.set({ 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="bookings.csv"' });
  res.send(csv);
};
