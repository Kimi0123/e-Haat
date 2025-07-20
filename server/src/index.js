require("dotenv").config(); // Load .env variables
const express = require("express");
const { connectDB, sequelize } = require("./config/db");
const cors = require("cors");
const path = require("path");

// Import models and associations
require("./models/associations");

// Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Test DB connection
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Sync models and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
    console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
  });
});
