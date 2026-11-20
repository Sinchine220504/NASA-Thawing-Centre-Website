import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { config } from '../config.js';
import { User } from '../models/User.js';
import { Service } from '../models/Service.js';
import { Technician } from '../models/Technician.js';
import { DEFAULT_SERVICES, DEFAULT_TECHNICIANS } from './catalog.js';
import { logger } from './logger.js';

/** Idempotent: creates the admin user and default data only when missing. */
export async function seedDefaults() {
  if (!(await User.exists({ email: config.adminDefaultEmail }))) {
    await User.create({
      email: config.adminDefaultEmail,
      passwordHash: await User.hashPassword(config.adminDefaultPassword),
      role: 'admin',
    });
    logger.info(`Seeded admin user ${config.adminDefaultEmail}`);
  }
  if ((await Service.estimatedDocumentCount()) === 0) {
    await Service.insertMany(DEFAULT_SERVICES);
    logger.info(`Seeded ${DEFAULT_SERVICES.length} services`);
  }
  if ((await Technician.estimatedDocumentCount()) === 0) {
    await Technician.insertMany(DEFAULT_TECHNICIANS);
    logger.info(`Seeded ${DEFAULT_TECHNICIANS.length} technicians`);
  }
}

// Allow `npm run seed`
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await mongoose.connect(config.mongoUri);
  await seedDefaults();
  await mongoose.disconnect();
}
