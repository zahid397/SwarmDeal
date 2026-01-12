export const createGroup = async (req, res) => {
  try {
    const {
      productName,
      category,
      originalPrice,
      currentPrice,
      targetPrice,
      targetMembers,
    } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name required",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: {
        id: Date.now(),
        productName,
        category,
        originalPrice,
        currentPrice,
        targetPrice,
        targetMembers,
        createdAt: new Date(),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
