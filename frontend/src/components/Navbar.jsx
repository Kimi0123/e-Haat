// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaTags,
  FaGift,
  FaInfoCircle,
  FaPhone,
  FaSignOutAlt,
  FaUserCircle,
  FaClipboardList,
} from "react-icons/fa";
import bag from "../assets/bag.svg";
import ehaat from "../assets/ehaat.svg";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";

export const NAVBAR_HEIGHT = 80;
export const SECOND_NAV_HEIGHT = 48;

function Navbar({ showSecondNav, isMenuOpen, setMenuOpen, isLoggedIn }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const navLinks = [
    { label: "Home", href: "/", icon: <FaHome /> },
    { label: "Categories", href: "/categories", icon: <FaTags /> },
    { label: "Deals", href: "/deals", icon: <FaGift /> },
    { label: "Offers", href: "/offers", icon: <FaGift /> },
    { label: "About", href: "/about", icon: <FaInfoCircle /> },
    { label: "Contact", href: "/contact", icon: <FaPhone /> },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    showNotification(
      "info",
      "Logged Out",
      "You have been successfully logged out."
    );
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log("Searching for:", searchQuery);
      showNotification("info", "Search", `Searching for: ${searchQuery}`);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg text-black">
      {/* Main Navbar */}
      <div className="flex justify-between items-center h-20 px-4 md:px-8 lg:px-12">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={ehaat} alt="E-Haat logo" className="h-10" />
          </NavLink>
        </motion.div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <div
              className={`relative flex items-center transition-all duration-300 ${
                isSearchFocused ? "ring-2 ring-red-400" : ""
              }`}
            >
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products, brands, and categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:border-red-400 focus:outline-none shadow-sm text-black placeholder-gray-500 transition-all duration-300"
              />
              <FaSearch className="absolute left-4 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200"
              >
                <FaSearch className="text-sm" />
              </button>
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 relative">
          {isLoggedIn ? (
            <>
              {/* Wishlist */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink
                  to="/wishlist"
                  className="flex items-center space-x-1 text-sm hover:text-red-500 transition-colors duration-200"
                >
                  <FaHeart className="text-lg" />
                  <span className="hidden sm:inline">Wishlist</span>
                </NavLink>
              </motion.div>

              {/* Profile dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-sm hover:text-red-500 transition-colors duration-200 focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <FaUserCircle className="text-lg" />
                  <span className="hidden sm:inline">Profile</span>
                  <motion.span
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▾
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        <NavLink
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaUser className="text-gray-500" />
                          <span>My Account</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/order"
                          className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaClipboardList className="text-gray-500" />
                          <span>Orders</span>
                        </NavLink>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm hover:bg-gray-50 text-red-500 transition-colors duration-200"
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink to="/cart" className="relative">
                  <FaShoppingCart className="text-xl hover:text-red-500 transition-colors duration-200" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </NavLink>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="/login"
                  className="text-sm hover:text-red-500 transition-colors duration-200"
                >
                  Login
                </NavLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="/signup"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md"
                >
                  Sign Up
                </NavLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink to="/cart" className="relative">
                  <FaShoppingCart className="text-xl hover:text-red-500 transition-colors duration-200" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </NavLink>
              </motion.div>
            </>
          )}

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Secondary Navbar */}
      <AnimatePresence>
        {showSecondNav && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 48, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden md:flex justify-center items-center bg-gray-50 border-t border-gray-200 overflow-hidden"
          >
            <div className="flex space-x-8 text-sm">
              {navLinks.map(({ label, href, icon }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={href}
                    className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200 font-medium"
                  >
                    <span className="text-gray-500">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            id="mobile-menu"
            className="md:hidden bg-white shadow-lg px-4 pt-2 pb-4 border-t border-gray-200 overflow-hidden"
          >
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:border-red-400 focus:outline-none text-black placeholder-gray-500"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map(({ label, href, icon }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={href}
                    className="flex items-center space-x-3 py-3 px-2 hover:text-red-500 transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-gray-500">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Mobile Actions */}
            {isLoggedIn ? (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <NavLink
                  to="/dashboard"
                  className="flex items-center space-x-3 py-3 px-2 hover:text-red-500 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser className="text-gray-500" />
                  <span>My Account</span>
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className="flex items-center space-x-3 py-3 px-2 hover:text-red-500 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaHeart className="text-gray-500" />
                  <span>Wishlist</span>
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full py-3 px-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <NavLink
                  to="/login"
                  className="flex items-center space-x-3 py-3 px-2 hover:text-red-500 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser className="text-gray-500" />
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="/signup"
                  className="flex items-center space-x-3 py-3 px-2 hover:text-red-500 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser className="text-gray-500" />
                  <span>Sign Up</span>
                </NavLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

Navbar.propTypes = {
  showSecondNav: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
