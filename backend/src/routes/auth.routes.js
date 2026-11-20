import { Router } from 'express';
import { login, me, changePassword } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/auth/login', login);
router.get('/auth/me', requireAuth, me);
router.post('/auth/change-password', requireAuth, changePassword);

export default router;
