// server/src/controllers/agentController.js

import aiService from '../services/aiService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

class AgentController {
  static chat = asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
      res.status(400);
      throw new Error('Message is required');
    }

    const reply = await aiService.chat(message);

    res.json({
      success: true,
      reply,
    });
  });
}

export default AgentController;
