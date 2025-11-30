import { Router } from 'express';
import { login, ensureAdminSeed } from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/login', login);
router.post('/auth/seed', async (_req, res) => {
  const user = await ensureAdminSeed();
  res.json({ success: true, user: { id: user._id, email: user.email } });
});

export default router;
