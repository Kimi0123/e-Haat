const Wishlist = require("../models/Wishlist");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;
    const [item, created] = await Wishlist.findOrCreate({
      where: { userId, productId },
    });
    if (!created)
      return res.status(400).json({ message: "Product already in wishlist" });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;
    const item = await Wishlist.findOne({ where: { userId, productId } });
    if (!item)
      return res.status(404).json({ message: "Product not in wishlist" });
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

// Get all wishlist items for a user
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user;
    const items = await Wishlist.findAll({ where: { userId } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};
