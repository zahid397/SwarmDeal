import circleService from '../services/circleService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

class PaymentController {
  static createIntent = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const intent = await circleService.createPaymentIntent(amount);
    res.json({ success: true, intent });
  });
}
export default PaymentController;
