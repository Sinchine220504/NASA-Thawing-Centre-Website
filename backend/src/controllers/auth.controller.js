import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { config } from '../config.js';

export const ensureAdminSeed = async () => {
  const existing = await User.findOne({ email: config.adminDefaultEmail });
  if (existing) return existing;
  const passwordHash = await bcrypt.hash(config.adminDefaultPassword, 10);
  return User.create({ email: config.adminDefaultEmail, passwordHash });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const ok = await user.verifyPassword(password);
  if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const token = jwt.sign({ sub: user._id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
  return res.json({ success: true, token });
};


