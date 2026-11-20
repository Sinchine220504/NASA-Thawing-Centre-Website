import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const notFound = (req, res) => res.status(404).json({ success: false, message: `Not found: ${req.originalUrl}` });

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ success: false, message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ success: false, message: `Invalid ${err.path}` });
  }
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({ success: false, message: `A record with this ${field} already exists` });
  }
  const status = err.status || 500;
  if (status >= 500) logger.error(err);
  return res.status(status).json({ success: false, message: status >= 500 ? 'Internal server error' : err.message });
};
