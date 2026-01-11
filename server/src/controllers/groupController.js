import Group from '../models/Group.js';
import { asyncHandler } from '../middleware/errorHandler.js';

class GroupController {
  static createGroup = asyncHandler(async (req, res) => {
    const group = await Group.create(req.body);
    res.status(201).json({ success: true, group });
  });

  static listGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find({}).sort({ createdAt: -1 });
    res.json({ success: true, groups });
  });
}
export default GroupController;
