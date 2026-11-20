import mongoose from 'mongoose';

export const SERVICE_CATEGORIES = ['Emergency', 'Roadside Assistance', 'Fitment Services', 'General Repair'];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, maxlength: 80 },
    slug: { type: String, unique: true, trim: true },
    category: { type: String, enum: SERVICE_CATEGORIES, default: 'Roadside Assistance' },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    icon: { type: String, default: '🛠️' },
    basePrice: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 100 },
  },
  { timestamps: true }
);

ServiceSchema.pre('validate', function (next) {
  if (!this.slug && this.name) this.slug = slugify(this.name);
  next();
});

export const Service = mongoose.model('Service', ServiceSchema);
