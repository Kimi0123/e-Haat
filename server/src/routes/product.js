const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Get featured products
router.get("/featured", productController.getFeaturedProducts);

// Search products (must come before /:id route)
router.get("/search", productController.searchProducts);

// Get all unique categories
router.get("/categories", productController.getCategories);

// Get product by ID (must come after /search route)
router.get("/:id", productController.getProductById);

module.exports = router;
