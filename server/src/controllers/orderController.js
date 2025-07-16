const Order = require("../models/Order");

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
    } = req.body;
    // Generate a simple order number
    const orderNumber = "ORD-" + Date.now();
    const order = await Order.create({
      orderNumber,
      userId,
      items,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
