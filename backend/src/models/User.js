import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: 'Admin' },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'dispatcher'], default: 'admin' },
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password || '', this.passwordHash);
};

UserSchema.statics.hashPassword = (password) => bcrypt.hash(password, 10);

export const User = mongoose.model('User', UserSchema);
