const Cart = require("../models/Cart");

// Get cart for current user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Save/update cart for current user
exports.saveCart = async (req, res) => {
  try {
    const userId = req.user;
    const { items } = req.body;
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId, items });
    } else {
      cart.items = items;
      await cart.save();
    }
    res.json({ message: "Cart saved", items: cart.items });
  } catch (error) {
    res.status(500).json({ message: "Error saving cart", error });
  }
};

// Clear cart for current user
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({ where: { userId } });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
