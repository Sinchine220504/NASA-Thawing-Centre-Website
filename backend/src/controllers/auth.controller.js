import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config.js';
import { HttpError } from '../middleware/error.js';

export const login = async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email: String(email || '').toLowerCase().trim() });
  if (!user || !(await user.verifyPassword(password))) throw new HttpError(401, 'Invalid email or password');
  const token = jwt.sign({ sub: user._id, role: user.role, email: user.email }, config.jwtSecret, { expiresIn: '7d' });
  res.json({ success: true, token, user: { email: user.email, name: user.name, role: user.role } });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.sub).select('email name role');
  if (!user) throw new HttpError(401, 'User no longer exists');
  res.json({ success: true, user });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 8) throw new HttpError(400, 'New password must be at least 8 characters');
  const user = await User.findById(req.user.sub);
  if (!user || !(await user.verifyPassword(currentPassword))) throw new HttpError(400, 'Current password is incorrect');
  user.passwordHash = await User.hashPassword(newPassword);
  await user.save();
  res.json({ success: true });
};
