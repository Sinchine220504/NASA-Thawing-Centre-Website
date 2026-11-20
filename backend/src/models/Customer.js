import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, unique: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true },
    notes: { type: String, trim: true, maxlength: 1000 },
    totalBookings: { type: Number, default: 0 },
    lastBookingAt: { type: Date },
  },
  { timestamps: true }
);

export const Customer = mongoose.model('Customer', CustomerSchema);
