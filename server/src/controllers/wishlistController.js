const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

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
    const items = await Wishlist.findAll({ 
      where: { userId },
      include: [
        {
          model: Product,
          as: 'Product',
          attributes: ['id', 'name', 'price', 'images', 'rating', 'reviewCount']
        }
      ]
    });
    
    // Transform the data to match frontend expectations
    const wishlistItems = items.map(item => ({
      id: item.Product.id,
      name: item.Product.name,
      price: item.Product.price,
      image: item.Product.images && item.Product.images.length > 0 
        ? item.Product.images[0] 
        : null,
      rating: item.Product.rating || 0,
      reviewCount: item.Product.reviewCount || 0
    }));
    
    res.json(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};
