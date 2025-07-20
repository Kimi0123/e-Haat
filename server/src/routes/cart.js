const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticateJWT = require("../middleware/auth");

// Get cart for current user
router.get("/", authenticateJWT, cartController.getCart);
// Save/update cart for current user
router.post("/", authenticateJWT, cartController.saveCart);
// Clear cart for current user
router.delete("/", authenticateJWT, cartController.clearCart);

module.exports = router;
