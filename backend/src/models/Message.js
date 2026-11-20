import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 20 },
    subject: { type: String, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: ['New', 'Read', 'Resolved'], default: 'New' },
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', MessageSchema);
