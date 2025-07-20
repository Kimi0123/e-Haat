// Categories.jsx
import React, { useState, useEffect } from "react";
import {
  FaMobileAlt,
  FaShoppingBag,
  FaTshirt,
  FaGlasses,
  FaCoffee,
  FaLaptop,
  FaBlender,
  FaCartPlus,
  FaChild,
  FaSearch,
  FaFilter,
  FaSort,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../NotificationContext";

const defaultCategoryIcons = [
  <FaMobileAlt />,
  <FaShoppingBag />,
  <FaTshirt />,
  <FaGlasses />,
  <FaCoffee />,
  <FaLaptop />,
  <FaBlender />,
  <FaCartPlus />,
  <FaChild />,
  <FaBlender />,
  <FaGlasses />,
];
const defaultCategoryColors = [
  "bg-blue-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-violet-500",
];

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Could not load categories");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const path = `/category/${category.label
      .toLowerCase()
      .replace(/[\s&]+/g, "-")}`;
    showNotification(
      "info",
      "Navigating",
      `Opening ${category.label} category...`
    );
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showNotification("info", "Search", `Searching for: ${searchQuery}`);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "popular" && category.productCount > 500) ||
      (selectedFilter === "new" && category.productCount < 400);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-[140px] pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Shop by Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products organized by categories. Find
            exactly what you're looking for.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:border-red-400 focus:outline-none text-black placeholder-gray-500 transition-all duration-300"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:border-red-400 focus:outline-none bg-white text-black transition-all duration-300"
              >
                <option value="all">All Categories</option>
                <option value="popular">Popular</option>
                <option value="new">New</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-500">
            Loading categories...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Category Icon */}
                <div
                  className={`${
                    defaultCategoryColors[index % defaultCategoryColors.length]
                  } p-6 flex justify-center items-center`}
                >
                  <div className="text-white text-4xl group-hover:scale-110 transition-transform duration-300">
                    {defaultCategoryIcons[index % defaultCategoryIcons.length]}
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {category.label}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {category.productCount.toLocaleString()} products
                    </span>
                    <motion.div
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 3 }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600">Total Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {categories
                  .reduce((sum, cat) => sum + cat.productCount, 0)
                  .toLocaleString()}
              </div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {Math.round(
                  categories.reduce((sum, cat) => sum + cat.productCount, 0) /
                    categories.length
                ).toLocaleString()}
              </div>
              <div className="text-gray-600">Avg. Products per Category</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Try our advanced search or browse our featured collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/deals")}
            >
              View Deals
            </motion.button>
            <motion.button
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
            >
              Browse Homepage
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
