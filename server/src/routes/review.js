const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authenticateJWT = require("../middleware/auth");

// Create a review
router.post("/", authenticateJWT, reviewController.createReview);
// Get all reviews for a product
router.get("/product/:productId", reviewController.getReviewsByProduct);
// Update a review
router.put("/:id", authenticateJWT, reviewController.updateReview);
// Delete a review
router.delete("/:id", authenticateJWT, reviewController.deleteReview);

module.exports = router;
