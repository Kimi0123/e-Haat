const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place a new order (checkout)
router.post("/", orderController.createOrder);

// Get all orders for a user (future use)
router.get("/user/:userId", orderController.getOrdersByUser);

module.exports = router;
