import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaHeart,
  FaShare,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCheck,
  FaMinus,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaThumbsUp,
  FaThumbsDown,
  FaReply,
  FaUser,
  FaCalendar,
  FaTag,
  FaBox,
  FaCreditCard,
  FaTruck as FaDelivery,
} from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";
import { useCart } from "../CartContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useAuth();
  const { showNotification } = useNotification();
  const { addToCart, isInCart } = useCart();

  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  // Add review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );

        if (response.ok) {
          const productData = await response.json();

          // Transform API data to match component expectations
          const transformedProduct = {
            ...productData,
            // Map API fields to component fields
            totalReviews: productData.reviewCount || 0,
            shortDescription:
              productData.description?.substring(0, 100) + "..." || "",
            // Add default values for missing fields
            colors: productData.colors || [],
            sizes: productData.sizes || [],
            features: productData.features || [],
            reviews: productData.reviews || [],
            relatedProducts: productData.relatedProducts || [],
            // Ensure images are properly formatted
            images:
              productData.images && productData.images.length > 0
                ? productData.images
                : [
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E",
                  ],
          };

          setProduct(transformedProduct);
        } else {
          showNotification(
            "error",
            "Product Not Found",
            "The requested product could not be found."
          );
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        showNotification(
          "error",
          "Connection Error",
          "Unable to load product details."
        );
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, navigate, showNotification]);

  // Handlers
  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      showNotification(
        "warning",
        "Size Required",
        "Please select a size before adding to cart."
      );
      return;
    }
    if (!selectedColor && product.colors.length > 0) {
      showNotification(
        "warning",
        "Color Required",
        "Please select a color before adding to cart."
      );
      return;
    }

    const added = addToCart(product, quantity, selectedSize, selectedColor);
    if (added) {
      showNotification(
        "success",
        "Added to Cart",
        `${product.name} has been added to your cart!`
      );
    } else {
      navigate("/login");
    }
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showNotification(
      isWishlisted ? "info" : "success",
      isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      `${product.name} has been ${
        isWishlisted ? "removed from" : "added to"
      } your wishlist!`
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification(
        "success",
        "Link Copied",
        "Product link has been copied to clipboard!"
      );
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  // Add review submit handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewRating || !reviewComment.trim()) {
      showNotification(
        "error",
        "Incomplete",
        "Please provide a rating and comment."
      );
      return;
    }
    setIsSubmittingReview(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          productId: productId,
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment,
        }),
      });
      if (response.ok) {
        showNotification(
          "success",
          "Review Submitted",
          "Thank you for your feedback!"
        );
        setShowReviewForm(false);
        setReviewRating(0);
        setReviewTitle("");
        setReviewComment("");
        // Refetch product to update reviews
        // (You may want to refactor fetchProduct to be callable here)
        window.location.reload();
      } else {
        const err = await response.json();
        showNotification(
          "error",
          "Error",
          err.message || "Failed to submit review."
        );
      }
    } catch (error) {
      showNotification("error", "Error", "Failed to submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[140px]">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      ) : !product ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Go Back Home
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-red-600"
                >
                  Home
                </button>
              </li>
              <li>/</li>
              <li>
                <button
                  onClick={() => navigate("/categories")}
                  className="hover:text-red-600"
                >
                  {product.category}
                </button>
              </li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={
                    product.images[selectedImage]
                      ? `http://localhost:5000${product.images[selectedImage]}`
                      : "/placeholder-product.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    e.target.src = "/placeholder-product.png";
                  }}
                  onLoad={() => {
                    console.log(
                      "Image loaded successfully:",
                      product.images[selectedImage]
                    );
                  }}
                />
              </motion.div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-red-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={
                        image
                          ? `http://localhost:5000${image}`
                          : "/placeholder-product.png"
                      }
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(
                          "Thumbnail failed to load:",
                          e.target.src
                        );
                        e.target.src = "/placeholder-product.png";
                      }}
                      onLoad={() => {
                        console.log("Thumbnail loaded successfully:", image);
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Brand and Rating */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-black">
                  {product.brand || "N/A"}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-black">
                    ({product.totalReviews} reviews)
                  </span>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-black">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-red-600">
                  Rs. {parseFloat(product.price).toLocaleString()}
                </span>
                {product.originalPrice &&
                  parseFloat(product.originalPrice) >
                    parseFloat(product.price) && (
                    <>
                      <span className="text-xl text-black line-through">
                        Rs. {parseFloat(product.originalPrice).toLocaleString()}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                        -
                        {Math.round(
                          ((parseFloat(product.originalPrice) -
                            parseFloat(product.price)) /
                            parseFloat(product.originalPrice)) *
                            100
                        )}
                        %
                      </span>
                    </>
                  )}
              </div>

              {/* Short Description */}
              <p className="text-black">{product.shortDescription}</p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-2">
                    Color
                  </h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-black">
                      Storage
                    </h3>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 text-black ${
                          selectedSize === size
                            ? "border-red-500 bg-red-50 text-red-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <FaMinus className="w-3 h-3 text-black" />
                  </button>
                  <span className="w-12 text-center font-semibold text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <FaPlus className="w-3 h-3 text-black" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShoppingCart />
                  <span>
                    {isInCart(product.id, selectedSize, selectedColor)
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </span>
                </motion.button>
                <motion.button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAddToWishlist}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors text-black ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FaHeart
                    className={isWishlisted ? "text-red-500" : "text-gray-400"}
                  />
                  <span>Wishlist</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors text-black"
                >
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>

              {/* Product Features */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-black mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-sm text-black"
                    >
                      <FaCheck className="text-green-500 w-3 h-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <FaTruck className="text-blue-600" />
                  <span className="font-semibold text-black">
                    Free Delivery
                  </span>
                </div>
                <p className="text-sm text-black">
                  Get it by tomorrow with free delivery
                </p>
              </div>
            </motion.div>
          </div>
          {/* Product Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-16">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                {[
                  { id: "description", label: "Description" },
                  { id: "specifications", label: "Specifications" },
                  { id: "reviews", label: "Reviews" },
                  { id: "shipping", label: "Shipping & Returns" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "description" && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-black leading-relaxed">
                      {product.description}
                    </p>
                  </motion.div>
                )}

                {activeTab === "specifications" && (
                  <motion.div
                    key="specifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="font-medium text-black">
                              {key}
                            </span>
                            <span className="text-black">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      {/* Write Review Button */}
                      {isLoggedIn && (
                        <div className="mb-6">
                          {!showReviewForm ? (
                            <button
                              onClick={() => setShowReviewForm(true)}
                              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
                            >
                              Write a Review
                            </button>
                          ) : (
                            <form
                              onSubmit={handleReviewSubmit}
                              className="bg-gray-50 p-6 rounded-lg shadow space-y-4"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-black">
                                  Your Rating:
                                </span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    type="button"
                                    key={star}
                                    onClick={() => setReviewRating(star)}
                                    className="focus:outline-none"
                                  >
                                    <FaStar
                                      className={`w-6 h-6 ${
                                        star <= reviewRating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                              <input
                                type="text"
                                placeholder="Review Title (optional)"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                              />
                              <textarea
                                placeholder="Your review..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                                rows={4}
                                value={reviewComment}
                                onChange={(e) =>
                                  setReviewComment(e.target.value)
                                }
                                required
                              />
                              <div className="flex items-center space-x-4">
                                <button
                                  type="submit"
                                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-60"
                                  disabled={isSubmittingReview}
                                >
                                  {isSubmittingReview
                                    ? "Submitting..."
                                    : "Submit Review"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setShowReviewForm(false)}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      )}
                      {/* Reviews List */}
                      {product.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 pb-6"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <FaUser className="text-gray-400" />
                              <span className="font-medium text-black">
                                {review.user}
                              </span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h4 className="font-semibold text-black mb-1">
                            {review.title}
                          </h4>
                          <p className="text-black mb-2">{review.comment}</p>
                          <div className="flex items-center justify-between text-sm text-black">
                            <span>
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                            <button className="flex items-center space-x-1 hover:text-gray-700 text-black">
                              <FaThumbsUp />
                              <span>Helpful ({review.helpful})</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      <div className="flex items-start space-x-3">
                        <FaDelivery className="text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-black">
                            Free Delivery
                          </h4>
                          <p className="text-black">
                            Free standard delivery on orders over Rs. 5,000
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FaShieldAlt className="text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-black">
                            Secure Payment
                          </h4>
                          <p className="text-black">
                            Your payment information is encrypted and secure
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FaUndo className="text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-black">
                            Easy Returns
                          </h4>
                          <p className="text-black">
                            30-day return policy for most items
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Related Products */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-black mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-600">
                        Rs. {relatedProduct.price.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400 w-4 h-4" />
                        <span className="text-sm text-black">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
