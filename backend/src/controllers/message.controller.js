import { Message } from '../models/Message.js';
import { crud } from './crud.factory.js';

export const messageCrud = crud(Message, {
  label: 'Message',
  fields: ['status'],
  searchFields: ['name', 'email', 'phone', 'subject', 'message'],
});

export const createMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};
  if (!email && !phone) return res.status(400).json({ success: false, message: 'Please share an email or phone number' });
  await Message.create({ name, email, phone, subject, message });
  res.status(201).json({ success: true, message: 'Thanks! We will get back to you shortly.' });
};
