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
  FaArrowRight,
  FaStar,
  FaHeart,
  FaTruck,
  FaCreditCard,
  FaBox,
  FaUsers,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNotification } from "../NotificationContext";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import Footer from "../components/Footer";
import { formatPrice } from "../utils/currency";

export default function Homepage() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      // Fetch all products
      const productsResponse = await fetch(
        "http://localhost:5000/api/products"
      );
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        // Filter only active products for display
        const activeProducts = productsData.filter(
          (product) => product.isActive && product.stock > 0
        );
        setProducts(activeProducts);
      }

      // Fetch featured products
      const featuredResponse = await fetch(
        "http://localhost:5000/api/products/featured"
      );
      if (featuredResponse.ok) {
        const featuredData = await featuredResponse.json();
        setFeaturedProducts(featuredData);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("error", "Connection Error", "Unable to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (label) => {
    const path = `/category/${label.toLowerCase().replace(/[\s&]+/g, "-")}`;
    navigate(path);
  };

  const handleAddToCart = (product) => {
    const added = addToCart(product);
    if (added) {
      showNotification(
        "success",
        "Added to Cart",
        `${product.title} has been added to your cart!`
      );
    } else {
      navigate("/login");
    }
  };

  const addToWishlist = (product) => {
    if (wishlist.find((item) => item.title === product.title)) {
      showNotification(
        "info",
        "Already in Wishlist",
        "This item is already in your wishlist."
      );
      return;
    }
    setWishlist((prev) => [...prev, product]);
    showNotification(
      "success",
      "Added to Wishlist",
      `${product.title} has been added to your wishlist!`
    );
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const categories = [
    { icon: <FaMobileAlt />, label: "Electronics", color: "bg-blue-500" },
    { icon: <FaShoppingBag />, label: "Women's Fashion", color: "bg-pink-500" },
    { icon: <FaTshirt />, label: "Men's Fashion", color: "bg-indigo-500" },
    { icon: <FaGlasses />, label: "Accessories", color: "bg-purple-500" },
    { icon: <FaCoffee />, label: "Beauty", color: "bg-red-500" },
    { icon: <FaLaptop />, label: "Computers", color: "bg-green-500" },
    { icon: <FaBlender />, label: "Home Appliances", color: "bg-yellow-500" },
    { icon: <FaCartPlus />, label: "Groceries", color: "bg-orange-500" },
    { icon: <FaCartPlus />, label: "Footwear", color: "bg-teal-500" },
    { icon: <FaChild />, label: "Toys", color: "bg-cyan-500" },
    { icon: <FaBlender />, label: "Kitchen", color: "bg-emerald-500" },
    { icon: <FaGlasses />, label: "Stationery", color: "bg-violet-500" },
  ];

  // Transform API products to match the expected format
  const transformProduct = (product) => ({
    title: product.name,
    price: parseFloat(product.price),
    original: product.originalPrice ? parseFloat(product.originalPrice) : null,
    discount: product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        ) + "%"
      : null,
    image:
      product.images && product.images.length > 0
        ? `http://localhost:5000${product.images[0]}`
        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E",
    rating: product.rating || 0,
    reviews: product.reviewCount || 0,
    category: product.category,
    inStock: product.stock > 0,
    id: product.id,
  });

  // Get flash sale products (products with original price > current price)
  const flashSale = products
    .filter(
      (product) =>
        product.originalPrice && product.originalPrice > product.price
    )
    .slice(0, 4)
    .map(transformProduct);

  // Get just for you products (featured or recent products)
  const justForYou =
    featuredProducts.length > 0
      ? featuredProducts.slice(0, 12).map(transformProduct)
      : products.slice(0, 12).map(transformProduct);

  // All products for the main grid
  const allProducts = products.map(transformProduct);

  const features = [
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      description: "Delivery across Nepal in 2–4 days.",
    },
    {
      icon: <FaCreditCard />,
      title: "Secure Payments",
      description: "Pay with Khalti, eSewa, COD.",
    },
    {
      icon: <FaBox />,
      title: "Wide Range",
      description: "From groceries to gadgets in one place.",
    },
    {
      icon: <FaUsers />,
      title: "Local Support",
      description: "Support local Nepali sellers.",
    },
  ];

  const stats = [
    { number: "25,000+", label: "Orders Delivered" },
    { number: "15,000+", label: "Happy Customers" },
    { number: "500+", label: "Sellers Onboard" },
    { number: "24/7", label: "Support Available" },
  ];

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return parseFloat(b.discount) - parseFloat(a.discount);
      default:
        return 0;
    }
  });

  const uniqueCategories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-red-600 transition-all duration-300"
        style={{
          width: `${
            (scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100
          }%`,
        }}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Hero Section */}
          <motion.section
            className="bg-gradient-to-r from-red-50 to-orange-50 py-16 pt-[140px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Hero Content */}
                <motion.div
                  className="flex-1 text-center lg:text-left"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900">
                    Discover Amazing
                    <span className="text-red-600 block">Products</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Shop the latest trends with unbeatable prices. Quality
                    products delivered right to your doorstep.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.button
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/categories")}
                    >
                      Browse Categories
                    </motion.button>
                    <motion.button
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/deals")}
                    >
                      View Deals
                    </motion.button>
                  </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                  className="flex-1"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <img
                    src="/iphone.webp"
                    alt="Featured Products"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Categories Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Shop by Categories
                </h2>
                <p className="text-lg text-gray-600">
                  Explore our wide range of products
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleClick(category.label)}
                  >
                    <div
                      className={`${category.color} p-6 rounded-t-xl flex justify-center`}
                    >
                      <span className="text-white text-3xl">
                        {category.icon}
                      </span>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {category.label}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Flash Sale Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Flash Sale
                  </h2>
                  <span className="text-2xl">⚡</span>
                </div>
                <motion.button
                  className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/deals")}
                >
                  View All <FaArrowRight />
                </motion.button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashSale.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleProductClick(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          -{item.discount}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(item);
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-red-50 transition-colors"
                      >
                        <FaHeart className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-600">
                          {item.rating}
                        </span>
                        <span className="text-sm text-gray-400">
                          ({item.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-red-600">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.original)}
                        </span>
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Just For You Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Just For You
                </h2>
                <p className="text-lg text-gray-600">
                  Personalized recommendations based on your preferences
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {justForYou.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleProductClick(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(item);
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-red-50 transition-colors"
                      >
                        <FaHeart className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-xs text-gray-600">
                          {item.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({item.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-red-600">
                          {formatPrice(item.price)}
                        </span>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* View All Products Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  All Products
                </h2>
                <p className="text-lg text-gray-600">
                  Browse our complete collection of products
                </p>
              </motion.div>

              {/* Filters */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-400 focus:outline-none text-black"
                    >
                      <option value="all">All Categories</option>
                      {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:border-red-400 focus:outline-none text-black"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="discount">Biggest Discount</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                            -{product.discount}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(product);
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-red-50 transition-colors"
                      >
                        <FaHeart className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-600">
                          {product.rating}
                        </span>
                        <span className="text-sm text-gray-400">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-red-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.original && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.original)}
                          </span>
                        )}
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/categories")}
                >
                  View More Products
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-red-50">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Why Shop With e-Haat?
                </h2>
                <p className="text-lg text-gray-600">
                  We provide the best shopping experience
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-red-600 text-4xl mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-red-600 text-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                    <p className="text-red-100">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-white text-center">
            <div className="max-w-4xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Join the e-Haat Family
                </h2>
                <p className="text-lg mb-8 text-gray-600">
                  Start your seamless online shopping journey now.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
                    >
                      Create Account
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
                    >
                      Login
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </>
  );
}
