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
      owner,
    } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: 'Product name required',
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
    console.error('Create group error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create group',
    });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: groups,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch groups',
    });
  }
};
