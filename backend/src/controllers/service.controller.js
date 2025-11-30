import { Service } from '../models/Service.js';

export const listServices = async (_req, res) => {
  const services = await Service.find({}).sort({ createdAt: -1 });
  return res.json({ success: true, services });
};

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json({ success: true, service });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
  if (!service) return res.status(404).json({ success: false, message: 'Not found' });
  return res.json({ success: true, service });
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  const result = await Service.findByIdAndDelete(id);
  if (!result) return res.status(404).json({ success: false, message: 'Not found' });
  return res.json({ success: true });
};


