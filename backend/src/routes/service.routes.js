import { Router } from 'express';
import { serviceCrud, listPublicServices, getPublicService } from '../controllers/service.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/services', listPublicServices);
router.get('/services/:slug', getPublicService);

router.get('/admin/services', requireAuth, serviceCrud.list);
router.post('/admin/services', requireAuth, serviceCrud.create);
router.patch('/admin/services/:id', requireAuth, serviceCrud.update);
router.delete('/admin/services/:id', requireAuth, serviceCrud.remove);

export default router;
