import express from 'express';
import GroupController from '../controllers/groupController.js';
const router = express.Router();

router.post('/create', GroupController.createGroup);
router.get('/', GroupController.listGroups);
export default router;
