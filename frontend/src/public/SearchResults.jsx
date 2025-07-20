import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useCart } from "../CartContext";
import { useNotification } from "../NotificationContext";
import { formatPrice } from "../utils/currency";

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = decodeURIComponent(query || "");

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, sortBy, priceFilter, categoryFilter]);

  const performSearch = async () => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        q: searchQuery,
        sort: sortBy,
        price: priceFilter,
        category: categoryFilter,
      });

      const response = await fetch(
        `http://localhost:5000/api/products/search?${params}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.products || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(
      "success",
      "Added to Cart",
      `${product.name} has been added to your cart!`
    );
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const clearFilters = () => {
    setSortBy("relevance");
    setPriceFilter("all");
    setCategoryFilter("all");
  };

  const getPriceRange = (price) => {
    if (price < 1000) return "Under Rs. 1,000";
    if (price < 5000) return "Rs. 1,000 - Rs. 5,000";
    if (price < 10000) return "Rs. 5,000 - Rs. 10,000";
    return "Over Rs. 10,000";
  };

  const filteredResults = searchResults.filter((product) => {
    if (priceFilter === "all") return true;

    const price = parseFloat(product.price);
    switch (priceFilter) {
      case "under-1000":
        return price < 1000;
      case "1000-5000":
        return price >= 1000 && price < 5000;
      case "5000-10000":
        return price >= 5000 && price < 10000;
      case "over-10000":
        return price >= 10000;
      default:
        return true;
    }
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[140px] pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Searching for "{searchQuery}"...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[140px] pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span>Back</span>
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Search Results
                </h1>
                <p className="text-gray-600">
                  {sortedResults.length} results for "{searchQuery}"
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaFilter className="text-sm" />
              <span>Filters</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Filters
                    </h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Sort By */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All Prices" },
                        { value: "under-1000", label: "Under Rs. 1,000" },
                        { value: "1000-5000", label: "Rs. 1,000 - Rs. 5,000" },
                        {
                          value: "5000-10000",
                          label: "Rs. 5,000 - Rs. 10,000",
                        },
                        { value: "over-10000", label: "Over Rs. 10,000" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="priceFilter"
                            value={option.value}
                            checked={priceFilter === option.value}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results */}
          <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
            {sortedResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-4xl text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No results found for "{searchQuery}"
                </h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search terms or browse our categories.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Browse Products
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {sortedResults.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div
                        className="relative cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        <img
                          src={
                            product.images?.[0]
                              ? `http://localhost:5000${product.images[0]}`
                              : "/placeholder-product.png"
                          }
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder-product.png";
                          }}
                        />
                        {product.originalPrice &&
                          parseFloat(product.originalPrice) >
                            parseFloat(product.price) && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {Math.round(
                                ((parseFloat(product.originalPrice) -
                                  parseFloat(product.price)) /
                                  parseFloat(product.originalPrice)) *
                                  100
                              )}
                              % OFF
                            </div>
                          )}
                      </div>

                      <div className="p-4">
                        <h3
                          className="font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-red-600 transition-colors"
                          onClick={() => handleProductClick(product)}
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 mb-2">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-sm text-gray-600">
                            {product.rating || 4.5}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({product.reviewCount || 120})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-red-600">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice &&
                            parseFloat(product.originalPrice) >
                              parseFloat(product.price) && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
