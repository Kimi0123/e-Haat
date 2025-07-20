import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../NotificationContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Footer from "../components/Footer";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      showNotification(
        "error",
        "Password Mismatch",
        "New passwords do not match. Please try again."
      );
      return;
    }

    if (formData.newPassword.length < 6) {
      showNotification(
        "warning",
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      showNotification(
        "success",
        "Password Updated",
        "Your password has been successfully changed!"
      );
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <main className="max-w-4xl mx-auto px-6 pt-[140px] pb-20 text-gray-900">
        {/* Hero Section */}
        <motion.section
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            Change <span className="text-red-600">Password</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Keep your account secure by updating your password regularly.
          </p>
        </motion.section>

        {/* Password Form */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors"
                    placeholder="Enter your current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.current ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.new ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirm ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Updating Password..." : "Update Password"}
              </motion.button>
            </form>
          </div>

          {/* Security Tips */}
          <motion.div
            className="mt-8 bg-red-50 p-6 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Password Security Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                Use a mix of uppercase, lowercase, numbers, and symbols
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                Avoid using personal information like birthdays or names
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                Don't reuse passwords from other accounts
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                Consider using a password manager for better security
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
