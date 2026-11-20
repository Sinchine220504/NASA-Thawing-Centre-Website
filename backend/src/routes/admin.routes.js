import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { technicianCrud } from '../controllers/technician.controller.js';
import { customerCrud, customerBookings } from '../controllers/customer.controller.js';
import { messageCrud, createMessage } from '../controllers/message.controller.js';
import { summary } from '../controllers/report.controller.js';

const router = Router();

// Public contact form
router.post('/contact', createMessage);

const mount = (path, c) => {
  router.get(`/admin/${path}`, requireAuth, c.list);
  router.get(`/admin/${path}/:id`, requireAuth, c.get);
  router.post(`/admin/${path}`, requireAuth, c.create);
  router.patch(`/admin/${path}/:id`, requireAuth, c.update);
  router.delete(`/admin/${path}/:id`, requireAuth, c.remove);
};

mount('technicians', technicianCrud);
mount('customers', customerCrud);
router.get('/admin/customers/:id/bookings', requireAuth, customerBookings);
mount('messages', messageCrud);

router.get('/admin/reports/summary', requireAuth, summary);

export default router;
