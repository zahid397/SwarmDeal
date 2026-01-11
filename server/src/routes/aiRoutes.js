// server/src/routes/aiRoutes.js

import express from 'express';
import AgentController from '../controllers/agentController.js';

const router = express.Router();

router.post('/chat', AgentController.chat);

export default router;
