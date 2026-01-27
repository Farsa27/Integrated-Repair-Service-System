import express from 'express';
import {
  createAppointment,
  getAppointmentById,
  getCustomerAppointments,
  getProfessionalAppointments,
  updateAppointmentStatus,
  updateQuotedPrice,
  acceptQuote,
  addReview,
  cancelAppointment
} from '../controllers/appointmentController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createAppointment);
router.get('/:id', authMiddleware, getAppointmentById);
router.get('/customer/my-appointments', authMiddleware, getCustomerAppointments);
router.get('/professional/my-appointments', authMiddleware, getProfessionalAppointments);
router.put('/:id/status', authMiddleware, updateAppointmentStatus);
router.put('/:id/quote', authMiddleware, updateQuotedPrice);
router.put('/:id/accept-quote', authMiddleware, acceptQuote);
router.put('/:id/review', authMiddleware, addReview);
router.put('/:id/cancel', authMiddleware, cancelAppointment);

export default router;
