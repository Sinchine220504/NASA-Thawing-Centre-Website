import { Technician } from '../models/Technician.js';
import { crud } from './crud.factory.js';

export const technicianCrud = crud(Technician, {
  label: 'Technician',
  fields: ['name', 'phone', 'skills', 'vehicleNumber', 'zone', 'status', 'rating', 'isActive'],
  searchFields: ['name', 'phone', 'zone', 'vehicleNumber'],
  sort: { status: 1, name: 1 },
});
