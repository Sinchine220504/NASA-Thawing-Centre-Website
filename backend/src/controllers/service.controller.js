import { Service } from '../models/Service.js';
import { crud } from './crud.factory.js';

export const serviceCrud = crud(Service, {
  label: 'Service',
  fields: ['name', 'slug', 'category', 'description', 'icon', 'basePrice', 'isActive', 'order'],
  searchFields: ['name', 'description', 'category'],
  sort: { order: 1, name: 1 },
});

/** Public list: active services only, sorted for display. ?all=1 is honoured for admins via the admin route. */
export const listPublicServices = async (_req, res) => {
  const services = await Service.find({ isActive: true }).sort({ order: 1, name: 1 });
  res.json({ success: true, services });
};

export const getPublicService = async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, isActive: true });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, service });
};
