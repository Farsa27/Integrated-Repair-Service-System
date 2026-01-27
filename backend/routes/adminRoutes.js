import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getAllProfessionals,
  verifyProfessional,
  rejectProfessional,
  getAllAppointments,
  getServiceReports
} from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, adminMiddleware, getDashboardStats);
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/professionals', authMiddleware, adminMiddleware, getAllProfessionals);
router.get('/appointments', authMiddleware, adminMiddleware, getAllAppointments);
router.get('/reports/services', authMiddleware, adminMiddleware, getServiceReports);
router.put('/professionals/:id/verify', authMiddleware, adminMiddleware, verifyProfessional);
router.put('/professionals/:id/reject', authMiddleware, adminMiddleware, rejectProfessional);

export default router;
