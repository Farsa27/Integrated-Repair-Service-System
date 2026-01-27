import express from 'express';
import {
  getProfessionalsByService,
  getProfessionalById,
  registerProfessional,
  updateProfessionalProfile,
  getProfessionalProfile,
  updateAvailability,
  searchProfessionals
} from '../controllers/professionalController.js';
import { authMiddleware, professionalMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/service/:serviceId', getProfessionalsByService);
router.get('/search', searchProfessionals);
router.get('/:id', getProfessionalById);
router.post('/register', authMiddleware, registerProfessional);
router.get('/profile/my-profile', authMiddleware, professionalMiddleware, getProfessionalProfile);
router.put('/profile/:id', authMiddleware, professionalMiddleware, updateProfessionalProfile);
router.put('/:id/availability', authMiddleware, professionalMiddleware, updateAvailability);

export default router;
