const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateJWT = require("../middleware/auth");

// Place a new order (checkout)
router.post("/", orderController.createOrder);

// Get all orders for a user (future use)
router.get("/user/:userId", orderController.getOrdersByUser);

// Get orders for current user
router.get("/my-orders", authenticateJWT, orderController.getMyOrders);

module.exports = router;
