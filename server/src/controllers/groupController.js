// server/src/controllers/groupController.js

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Group name required",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: {
        id: Date.now(),
        name,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getGroups = async (req, res) => {
  return res.json({
    success: true,
    data: [],
  });
};
