import mongoose from 'mongoose';

const TechnicianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, unique: true },
    skills: { type: [String], default: [] },
    vehicleNumber: { type: String, trim: true, uppercase: true },
    zone: { type: String, trim: true },
    status: { type: String, enum: ['Available', 'Busy', 'Off Duty'], default: 'Available' },
    rating: { type: Number, min: 0, max: 5, default: 5 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Technician = mongoose.model('Technician', TechnicianSchema);
