import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserShield,
  FaChartBar,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaTachometerAlt,
  FaClipboardList,
  FaUserCog,
  FaStore,
  FaChartLine,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import ehaat from "../assets/ehaat.svg";
import { useNotification } from "../NotificationContext";

export const ADMIN_NAVBAR_HEIGHT = 80;

function AdminNavbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const adminNavLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { label: "Orders", href: "/admin/orders", icon: <FaClipboardList /> },
    { label: "Users", href: "/admin/users", icon: <FaUsers /> },
    { label: "Products", href: "/admin/products", icon: <FaBox /> },
    { label: "Settings", href: "/admin/settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    setDropdownOpen(false);
    showNotification(
      "info",
      "Admin Logout",
      "You have been successfully logged out from admin panel."
    );
    navigate("/admin/login");
  };

  const handleGoToUserSite = () => {
    navigate("/");
    showNotification(
      "info",
      "Switching to User Site",
      "Redirecting to e-Haat user interface."
    );
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 shadow-lg text-white">
      {/* Main Admin Navbar */}
      <div className="flex justify-between items-center h-20 px-4 md:px-8 lg:px-12">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink
            to="/admin/dashboard"
            className="flex items-center space-x-2"
          >
            <img src={ehaat} alt="E-Haat Admin" className="h-10" />
            <div className="hidden md:block">
              <span className="text-xl font-bold">e-Haat</span>
              <span className="text-xs text-blue-300 block">Admin Panel</span>
            </div>
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {adminNavLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-blue-200 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {link.icon}
                <span className="text-sm font-medium">{link.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Admin Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 text-blue-200 hover:text-white transition-colors"
          >
            <FaBell className="text-lg" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </motion.button>

          {/* Admin Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <FaUserShield className="text-white text-sm" />
              </div>
              <span className="hidden md:block text-sm font-medium">Admin</span>
              <motion.span
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs"
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
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <FaUserShield className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Administrator
                        </p>
                        <p className="text-xs text-gray-500">
                          admin@e-haat.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <NavLink
                      to="/admin/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors text-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaTachometerAlt className="text-gray-500" />
                      <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                      to="/admin/settings"
                      className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors text-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaCog className="text-gray-500" />
                      <span>Settings</span>
                    </NavLink>
                    <button
                      onClick={handleGoToUserSite}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      <FaHome className="text-gray-500" />
                      <span>Go to User Site</span>
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm hover:bg-gray-50 text-red-500 transition-colors"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6 text-white" />
            ) : (
              <FaBars className="h-6 w-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gray-800 border-t border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {adminNavLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-blue-200 hover:text-white hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </NavLink>
              ))}

              <div className="border-t border-gray-700 pt-2 mt-2">
                <button
                  onClick={handleGoToUserSite}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-blue-200 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <FaHome />
                  <span className="text-sm font-medium">Go to User Site</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <FaSignOutAlt />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default AdminNavbar;
