const Order = require("../models/Order");
const User = require("../models/User");

// Helper to generate unique order number
function generateOrderNumber() {
  return (
    "ORD-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.floor(Math.random() * 10000)
  );
}

// Place a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod,
      couponCode,
      discountAmount,
      status,
    } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "No items in order." });
    if (!totalAmount)
      return res.status(400).json({ message: "Missing totalAmount." });
    if (!shippingAddress)
      return res.status(400).json({ message: "Missing shippingAddress." });
    if (!billingAddress)
      return res.status(400).json({ message: "Missing billingAddress." });
    if (!paymentMethod)
      return res.status(400).json({ message: "Missing paymentMethod." });

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
      orderNumber: generateOrderNumber(),
      userId: finalUserId,
      items: items,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
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
    // Use req.userId as set by the auth middleware
    const userId = req.userId;
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
