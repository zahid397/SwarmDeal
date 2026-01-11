import express from 'express';
import AuthController from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', AuthController.login);
router.get('/me', authenticate, AuthController.getProfile);
export default router;
