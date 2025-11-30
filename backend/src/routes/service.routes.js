import { Router } from 'express';
import { listServices, createService, updateService, deleteService } from '../controllers/service.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/services', listServices);
router.post('/services', requireAuth, createService);
router.patch('/services/:id', requireAuth, updateService);
router.delete('/services/:id', requireAuth, deleteService);

export default router;
