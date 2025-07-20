// Signup.jsx
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import BASE_URL from "../utils/api.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showNotification(
        "error",
        "Password Mismatch",
        "Passwords don't match. Please try again."
      );
      return;
    }

    if (!form.agree) {
      showNotification(
        "warning",
        "Terms Required",
        "Please agree to the terms and conditions to continue."
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showNotification(
          "success",
          "Account Created",
          "Your account has been created successfully! Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showNotification(
          "error",
          "Signup Failed",
          data.message || "Unable to create account. Please try again."
        );
      }
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      showNotification(
        "error",
        "Connection Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

      showNotification("success", "Success!", "Google SignUp Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Google Sign-Up Error:", error);
      showNotification(
        "error",
        "Google Signup Failed",
        "Unable to sign up with Google. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join e-Haat</h1>
          <p className="text-gray-600">
            Create your account to start shopping with us
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="large" text="Creating your account..." />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-black placeholder-gray-500"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-black placeholder-gray-500"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-black placeholder-gray-500"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-black placeholder-gray-500"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Enter 10 digit phone number"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-black placeholder-gray-500"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-black placeholder-gray-500"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  required
                  disabled={isLoading}
                />
                <label className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="small" text="" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign Up */}
          <motion.button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </motion.button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Get your orders delivered quickly
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">💳</div>
            <h3 className="font-semibold text-gray-800">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Safe and secure payment options
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-semibold text-gray-800">Great Deals</h3>
            <p className="text-sm text-gray-600">
              Best prices and exclusive offers
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
