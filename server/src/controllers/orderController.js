const Order = require("../models/Order");
const User = require("../models/User");

// Place a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      couponCode,
      discountAmount,
      status,
    } = req.body;

    // Handle user ID - create default user if needed
    let finalUserId = userId;
    if (!userId || userId === "guest") {
      // Try to find existing default user
      let defaultUser = await User.findOne({
        where: { email: "guest@ehaat.com" },
      });

      if (!defaultUser) {
        // Create default user for guest orders
        defaultUser = await User.create({
          name: "Guest User",
          email: "guest@ehaat.com",
          phone: "0000000000",
          role: "user",
        });
      }

      finalUserId = defaultUser.id;
    } else {
      // Verify user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
      finalUserId = userId;
    }

    // Create order
    const order = await Order.create({
      userId: finalUserId,
      items: items,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      couponCode: couponCode,
      discountAmount: discountAmount || 0,
      status: status || "pending",
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      details: error.errors?.map((e) => e.message) || [],
    });
  }
};

// Get all orders for a user (future use)
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get all orders for a user (future use)
exports.getAllOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get orders for current user
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    console.error("Get my orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
