import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaKey,
} from "react-icons/fa";
import { useNotification } from "../NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for admin login
      const response = await fetch(
        "http://localhost:5000/api/auth/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store admin token and set admin status
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("isAdmin", "true");
        setIsAdmin(true);

        showNotification(
          "success",
          "Admin Login Successful",
          "Welcome back, Administrator! Redirecting to admin dashboard..."
        );

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        showNotification(
          "error",
          "Admin Login Failed",
          data.message || "Invalid admin credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Admin Login Error:", error);
      showNotification(
        "error",
        "Connection Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <FaUserShield className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-blue-200">
            Secure access to e-Haat administration panel
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="large" text="Authenticating..." />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="admin@e-haat.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="small" text="" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <FaKey />
                    <span>Access Admin Panel</span>
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Security Notice */}
          <motion.div
            className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 text-yellow-300">
              <FaShieldAlt />
              <span className="text-sm font-medium">Security Notice</span>
            </div>
            <p className="text-xs text-yellow-200 mt-1">
              This is a secure admin portal. Unauthorized access attempts will
              be logged and reported.
            </p>
          </motion.div>

          {/* Back to Regular Login */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-blue-200 hover:text-white text-sm transition-colors"
            >
              ← Back to User Login
            </Link>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs text-blue-200">
            For admin access, contact the system administrator
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
