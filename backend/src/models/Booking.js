import mongoose from 'mongoose';
import crypto from 'crypto';

export const BOOKING_STATUSES = [
  'Pending',
  'Assigned',
  'En Route',
  'Arrived',
  'In Progress',
  'Completed',
  'Cancelled',
];
export const PAYMENT_STATUSES = ['Unpaid', 'Paid', 'Refunded'];

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const generateBookingCode = () => {
  const bytes = crypto.randomBytes(6);
  let out = '';
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return `NTC-${out}`;
};

const HistorySchema = new mongoose.Schema(
  {
    status: { type: String, enum: BOOKING_STATUSES, required: true },
    note: { type: String, trim: true },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, index: true, default: generateBookingCode },
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    phoneNumber: { type: String, required: true, trim: true, match: [/^[+\d][\d\s-]{6,16}$/, 'Invalid phone'] },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    location: { type: String, required: true, trim: true, maxlength: 300 },
    coordinates: {
      lat: { type: Number, min: -90, max: 90 },
      lng: { type: Number, min: -180, max: 180 },
    },
    serviceType: { type: String, required: true, trim: true },
    vehicleType: { type: String, enum: ['Car', 'Bike', 'SUV', 'Commercial', 'Other'], default: 'Car' },
    vehicleNumber: { type: String, trim: true, uppercase: true, maxlength: 20 },
    issueDescription: { type: String, trim: true, maxlength: 1000 },
    source: { type: String, enum: ['web', 'whatsapp', 'phone', 'admin'], default: 'web' },

    status: { type: String, enum: BOOKING_STATUSES, default: 'Pending', index: true },
    statusHistory: { type: [HistorySchema], default: () => [{ status: 'Pending', note: 'Request received' }] },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' },
    etaMinutes: { type: Number, min: 0, max: 600 },
    etaAt: { type: Date },
    adminNotes: { type: String, trim: true, maxlength: 1000 },

    // Payment-ready fields (Razorpay/Stripe integration later)
    amount: { type: Number, min: 0, default: 0 },
    paymentStatus: { type: String, enum: PAYMENT_STATUSES, default: 'Unpaid' },
    paymentRef: { type: String, trim: true },

    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

/** Fields safe to show to anyone holding the tracking code. */
BookingSchema.methods.toPublic = function () {
  const t = this.technician && typeof this.technician === 'object' && this.technician.name ? this.technician : null;
  return {
    code: this.code,
    fullName: this.fullName.split(' ')[0],
    serviceType: this.serviceType,
    vehicleType: this.vehicleType,
    location: this.location,
    status: this.status,
    statusHistory: this.statusHistory,
    etaMinutes: this.etaMinutes,
    etaAt: this.etaAt,
    technician: t ? { name: t.name, phone: t.phone, vehicleNumber: t.vehicleNumber } : null,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    completedAt: this.completedAt,
  };
};

export const Booking = mongoose.model('Booking', BookingSchema);
