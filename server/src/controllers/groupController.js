import Group from '../models/Group.js';

export const createGroup = async (req, res) => {
  try {
    const {
      productName,
      category,
      originalPrice,
      currentPrice,
      targetPrice,
      targetMembers,
      owner
    } = req.body;

    if (!productName || !targetMembers) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const group = await Group.create({
      productName,
      category,
      originalPrice,
      currentPrice,
      targetPrice,
      targetMembers,
      owner,
    });

    return res.status(201).json({
      success: true,
      message: 'Group created successfully',
      data: group,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
