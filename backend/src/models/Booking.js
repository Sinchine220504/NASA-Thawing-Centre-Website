import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    serviceType: {
      type: String,
      enum: ['Thawing', 'Towing', 'Rescue', 'Emergency Help'],
      required: true,
    },
    issueDescription: { type: String, trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model('Booking', BookingSchema);


