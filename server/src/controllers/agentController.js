import { asyncHandler } from '../middleware/errorHandler.js';

class AgentController {
  static chat = asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
      res.status(400);
      throw new Error('Message is required');
    }

    // DEMO RESPONSE
    res.json({
      success: true,
      reply: `Demo AI response for: ${message}`,
    });
  });
}

export default AgentController;
