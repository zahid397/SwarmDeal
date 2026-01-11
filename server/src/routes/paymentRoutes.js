import express from 'express';
import PaymentController from '../controllers/paymentController.js';
const router = express.Router();

router.post('/create-intent', PaymentController.createIntent);
export default router;
