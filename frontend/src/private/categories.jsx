// Categories.jsx
import React, { useState } from "react";
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

const categories = [
  {
    icon: <FaMobileAlt />,
    label: "Electronics",
    color: "bg-blue-500",
    description: "Smartphones, tablets, and gadgets",
    productCount: 1250,
  },
  {
    icon: <FaShoppingBag />,
    label: "Women's Fashion",
    color: "bg-pink-500",
    description: "Clothing, accessories, and beauty",
    productCount: 890,
  },
  {
    icon: <FaTshirt />,
    label: "Men's Fashion",
    color: "bg-indigo-500",
    description: "Men's clothing and accessories",
    productCount: 650,
  },
  {
    icon: <FaGlasses />,
    label: "Accessories",
    color: "bg-purple-500",
    description: "Jewelry, watches, and bags",
    productCount: 420,
  },
  {
    icon: <FaCoffee />,
    label: "Beauty & Health",
    color: "bg-red-500",
    description: "Cosmetics and personal care",
    productCount: 380,
  },
  {
    icon: <FaLaptop />,
    label: "Computers",
    color: "bg-green-500",
    description: "Laptops, desktops, and accessories",
    productCount: 290,
  },
  {
    icon: <FaBlender />,
    label: "Home Appliances",
    color: "bg-yellow-500",
    description: "Kitchen and home electronics",
    productCount: 340,
  },
  {
    icon: <FaCartPlus />,
    label: "Groceries",
    color: "bg-orange-500",
    description: "Fresh food and household items",
    productCount: 1560,
  },
  {
    icon: <FaCartPlus />,
    label: "Footwear",
    color: "bg-teal-500",
    description: "Shoes, boots, and sandals",
    productCount: 520,
  },
  {
    icon: <FaChild />,
    label: "Toys & Games",
    color: "bg-cyan-500",
    description: "Kids toys and educational games",
    productCount: 280,
  },
  {
    icon: <FaBlender />,
    label: "Kitchen & Dining",
    color: "bg-emerald-500",
    description: "Kitchen tools and dining essentials",
    productCount: 450,
  },
  {
    icon: <FaGlasses />,
    label: "Stationery",
    color: "bg-violet-500",
    description: "Office supplies and stationery",
    productCount: 320,
  },
];

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

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
    const matchesSearch =
      category.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());
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
                className={`${category.color} p-6 flex justify-center items-center`}
              >
                <div className="text-white text-4xl group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
              </div>

              {/* Category Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {category.label}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>
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
