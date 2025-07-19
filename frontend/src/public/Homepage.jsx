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
import Footer from "../components/Footer";

export default function Homepage() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (label) => {
    const path = `/category/${label.toLowerCase().replace(/[\s&]+/g, "-")}`;
    navigate(path);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showNotification(
      "success",
      "Added to Cart",
      `${product.title} has been added to your cart!`
    );
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

  const flashSale = [
    {
      title: "iPhone 15 - 128GB | A16 Chip",
      price: "Rs. 104,100",
      original: "Rs. 124,100",
      discount: "16%",
      image: "/iphone.png",
      rating: 4.8,
      reviews: 156,
    },
    {
      title: "Men's Casual Shirt - Linen",
      price: "Rs. 1,600",
      original: "Rs. 2,000",
      discount: "20%",
      image: "/menshirt.png",
      rating: 4.6,
      reviews: 234,
    },
    {
      title: "Floral Long Dress - Backless",
      price: "Rs. 2,125",
      original: "Rs. 2,500",
      discount: "15%",
      image: "/dress.png",
      rating: 4.5,
      reviews: 89,
    },
    {
      title: "Cordless Beard Trimmer - USB",
      price: "Rs. 1,800",
      original: "Rs. 2,200",
      discount: "18%",
      image: "/trimmer.png",
      rating: 4.4,
      reviews: 123,
    },
  ];

  const justForYou = [
    {
      title: "Black TWS Wireless Earbuds Pro Bluetooth Connectivity",
      price: "Rs. 2,200",
      image: "/earbuds.png",
      rating: 4.6,
      reviews: 89,
    },
    {
      title: "New Thick Soled Slide Sandals, Slip-On Casual Loafers",
      price: "Rs. 2,900",
      image: "/sandals.png",
      rating: 4.3,
      reviews: 156,
    },
    {
      title: "Fashionable Husky Pattern Anti-Fall Matte Sand Case",
      price: "Rs. 450",
      image: "/huskycase.png",
      rating: 4.8,
      reviews: 234,
    },
    {
      title: "SUMWON Premium Linen Look Skater Fit Pants",
      price: "Rs. 2,450",
      image: "/pants1.png",
      rating: 4.5,
      reviews: 78,
    },
    {
      title: "Cowgirl Boots, Thick Sole Mid-Calf High Heel Zipper",
      price: "Rs. 5,600",
      image: "/boots.png",
      rating: 4.7,
      reviews: 145,
    },
    {
      title: "iPhone 16 Pro Max 256GB",
      price: "Rs. 207,000",
      image: "/iphone16.png",
      rating: 4.9,
      reviews: 89,
    },
    {
      title: "Plastic Geometric Classic Never Outdated Glasses",
      price: "Rs. 1,800",
      image: "/glasses.png",
      rating: 4.4,
      reviews: 123,
    },
    {
      title: "Bohemian Style Beaded Bracelets With Shell, Beads",
      price: "Rs. 650",
      image: "/bracelets.png",
      rating: 4.6,
      reviews: 67,
    },
    {
      title: "Anua – Heartleaf Silky Moisture Sun Cream 50ml",
      price: "Rs. 2,300",
      image: "/cream.png",
      rating: 4.8,
      reviews: 234,
    },
    {
      title: "Classic Luxury Men Watch Business Leather Strap Quartz",
      price: "Rs. 6,450",
      image: "/watch.png",
      rating: 4.7,
      reviews: 156,
    },
    {
      title: "PETITE Autumn Casual Long Sleeve Slim Fit Shirt",
      price: "Rs. 1,350",
      image: "/stripedshirt.png",
      rating: 4.5,
      reviews: 89,
    },
    {
      title: "L.A. Colors Mineral Pressed Powder",
      price: "Rs. 600",
      image: "/lapowder.png",
      rating: 4.3,
      reviews: 123,
    },
  ];

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
                Shop the latest trends with unbeatable prices. Quality products
                delivered right to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/categories")}
                >
                  Shop Now
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
                  <span className="text-white text-3xl">{category.icon}</span>
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
              <h2 className="text-3xl font-bold text-gray-900">Flash Sale</h2>
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
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
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
                    onClick={() => addToWishlist(item)}
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
                    <span className="text-sm text-gray-600">{item.rating}</span>
                    <span className="text-sm text-gray-400">
                      ({item.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-red-600">
                      {item.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {item.original}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => addToCart(item)}
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
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => addToWishlist(item)}
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
                    <span className="text-xs text-gray-600">{item.rating}</span>
                    <span className="text-xs text-gray-400">
                      ({item.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-600">{item.price}</span>
                    <motion.button
                      onClick={() => addToCart(item)}
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
  );
}
