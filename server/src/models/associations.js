const User = require("./User");
const Order = require("./Order");
const Product = require("./Product");
const Review = require("./Review");
const Wishlist = require("./Wishlist");

// User associations
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
User.hasMany(Wishlist, { foreignKey: "userId", as: "wishlist" });

// Order associations
Order.belongsTo(User, { foreignKey: "userId", as: "User" });

// Product associations
Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Product.hasMany(Wishlist, { foreignKey: "productId", as: "wishlist" });

// Review associations
Review.belongsTo(User, { foreignKey: "userId", as: "User" });
Review.belongsTo(Product, { foreignKey: "productId", as: "Product" });

// Wishlist associations
Wishlist.belongsTo(User, { foreignKey: "userId", as: "User" });
Wishlist.belongsTo(Product, { foreignKey: "productId", as: "Product" });

module.exports = {
  User,
  Order,
  Product,
  Review,
  Wishlist,
};
