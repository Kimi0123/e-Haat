const Review = require("../models/Review");

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user;
    const review = await Review.create({ userId, productId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

// Get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.findAll({ where: { productId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const { rating, comment } = req.body;
    const review = await Review.findOne({ where: { id, userId } });
    if (!review) return res.status(404).json({ message: "Review not found" });
    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const review = await Review.findOne({ where: { id, userId } });
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};
