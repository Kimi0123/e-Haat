const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authenticateJWT = require("../middleware/auth");

// Add to wishlist
router.post("/add", authenticateJWT, wishlistController.addToWishlist);
// Remove from wishlist
router.post("/remove", authenticateJWT, wishlistController.removeFromWishlist);
// Get wishlist for user
router.get("/", authenticateJWT, wishlistController.getWishlist);

module.exports = router;
