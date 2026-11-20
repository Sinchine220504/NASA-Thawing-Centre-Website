import { HttpError } from '../middleware/error.js';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Generic admin CRUD handlers.
 * @param Model mongoose model
 * @param {{ fields: string[], searchFields?: string[], sort?: object, label: string }} opts
 */
export const crud = (Model, { fields, searchFields = [], sort = { createdAt: -1 }, label }) => {
  const pickFields = (body = {}) => Object.fromEntries(fields.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]));

  return {
    list: async (req, res) => {
      const filter = {};
      if (req.query.q && searchFields.length) {
        const rx = new RegExp(escapeRegex(String(req.query.q).trim()), 'i');
        filter.$or = searchFields.map((f) => ({ [f]: rx }));
      }
      if (req.query.status && req.query.status !== 'All') filter.status = req.query.status;
      const items = await Model.find(filter).sort(sort).limit(500);
      res.json({ success: true, items });
    },
    get: async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) throw new HttpError(404, `${label} not found`);
      res.json({ success: true, item });
    },
    create: async (req, res) => {
      const item = await Model.create(pickFields(req.body));
      res.status(201).json({ success: true, item });
    },
    update: async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, pickFields(req.body), { new: true, runValidators: true });
      if (!item) throw new HttpError(404, `${label} not found`);
      res.json({ success: true, item });
    },
    remove: async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) throw new HttpError(404, `${label} not found`);
      res.json({ success: true });
    },
  };
};
