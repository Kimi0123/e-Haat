import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaPaypal,
  FaMoneyBillWave,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCheck,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { useCart } from "../CartContext";
import { useNotification } from "../NotificationContext";
import { formatPrice } from "../utils/currency";

export default function BillingPage() {
  const navigate = useNavigate();
  const { cart, getCartSubtotal, clearCart } = useCart();
  const { showNotification } = useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [saveShippingInfo, setSaveShippingInfo] = useState(false);

  // Form states
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nepal",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    password: "",
    confirmPassword: "",
  });

  const subtotal = getCartSubtotal();
  const shipping = 0;
  const discount = isCouponApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setForm((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    }
    // Format expiry date
    else if (name === "cardExpiry") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2");
      setForm((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    }
    // Format CVV (numbers only)
    else if (name === "cardCvv") {
      const formatted = value.replace(/\D/g, "");
      setForm((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    }
    // Format phone number
    else if (name === "phone") {
      const formatted = value.replace(/\D/g, "");
      setForm((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "welcome10") {
      setIsCouponApplied(true);
      showNotification(
        "success",
        "Coupon Applied",
        "10% discount applied successfully!"
      );
    } else {
      showNotification(
        "error",
        "Invalid Coupon",
        "Please enter a valid coupon code."
      );
    }
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCoupon("");
    showNotification("info", "Coupon Removed", "Discount has been removed.");
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    for (const field of requiredFields) {
      if (!form[field].trim()) {
        showNotification(
          "error",
          "Missing Information",
          `Please fill in your ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}.`
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showNotification(
        "error",
        "Invalid Email",
        "Please enter a valid email address."
      );
      return false;
    }

    // Phone validation (at least 10 digits)
    if (form.phone.replace(/\D/g, "").length < 10) {
      showNotification(
        "error",
        "Invalid Phone",
        "Please enter a valid phone number (at least 10 digits)."
      );
      return false;
    }

    if (
      paymentMethod === "card" &&
      (!form.cardNumber || !form.cardName || !form.cardExpiry || !form.cardCvv)
    ) {
      showNotification(
        "error",
        "Payment Information",
        "Please fill in all payment details."
      );
      return false;
    }

    // Card validation
    if (paymentMethod === "card") {
      // Card number validation (basic Luhn algorithm)
      const cardNumber = form.cardNumber.replace(/\s/g, "");
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        showNotification(
          "error",
          "Invalid Card Number",
          "Please enter a valid card number."
        );
        return false;
      }

      // Expiry date validation
      const [month, year] = form.cardExpiry.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (
        !month ||
        !year ||
        parseInt(month) < 1 ||
        parseInt(month) > 12 ||
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        showNotification(
          "error",
          "Invalid Expiry Date",
          "Please enter a valid expiry date."
        );
        return false;
      }

      // CVV validation
      if (form.cardCvv.length < 3 || form.cardCvv.length > 4) {
        showNotification(
          "error",
          "Invalid CVV",
          "Please enter a valid CVV (3-4 digits)."
        );
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Get user info from localStorage or context
      const userToken = localStorage.getItem("userToken");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Prepare order data
      const orderData = {
        userId: user?.uid || "guest",
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        totalAmount: total,
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country,
        },
        billingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country,
        },
        paymentMethod: paymentMethod,
        discountAmount: discount,
        shippingCost: shipping,
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userToken && { Authorization: `Bearer ${userToken}` }),
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const orderResult = await response.json();
        setShowSuccess(true);
        clearCart();

        showNotification(
          "success",
          "Order Placed Successfully!",
          `Order #${orderResult.orderNumber} has been placed successfully.`
        );

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Order error response:", errorData);
        showNotification(
          "error",
          "Order Failed",
          errorData.message || "Failed to place order. Please try again."
        );
      }
    } catch (error) {
      console.error("Order placement error:", error);
      showNotification(
        "error",
        "Connection Error",
        "Unable to place order. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[140px] pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Add some products to your cart before checkout.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-[140px] pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FaCheck className="text-4xl text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for your purchase. You will receive an email
              confirmation shortly.
            </p>
            <p className="text-sm text-gray-500">Redirecting to homepage...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[140px] pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/cart")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Cart</span>
          </motion.button>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
            <p className="text-gray-600">Complete your purchase</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaUser className="text-red-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter your full address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter your state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Enter ZIP code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black"
                    placeholder="Country"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FaCreditCard className="text-red-600" />
                <h2 className="text-xl font-semibold text-black">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <label
                    htmlFor="cod"
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <FaMoneyBillWave className="text-green-600" />
                    <span className="font-medium text-black">
                      Cash on Delivery
                    </span>
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="esewa"
                    name="paymentMethod"
                    value="esewa"
                    checked={paymentMethod === "esewa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <label
                    htmlFor="esewa"
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">e</span>
                    </div>
                    <span className="font-medium text-black">e-Sewa</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="khalti"
                    name="paymentMethod"
                    value="khalti"
                    checked={paymentMethod === "khalti"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <label
                    htmlFor="khalti"
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">K</span>
                    </div>
                    <span className="font-medium text-black">Khalti</span>
                  </label>
                </div>
              </div>

              {(paymentMethod === "esewa" || paymentMethod === "khalti") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 space-y-4"
                >
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center ${
                          paymentMethod === "esewa"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      >
                        <span className="text-white text-sm font-bold">
                          {paymentMethod === "esewa" ? "e" : "K"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {paymentMethod === "esewa" ? "e-Sewa" : "Khalti"}{" "}
                          Payment
                        </h3>
                        <p className="text-sm text-gray-600">
                          You will be redirected to{" "}
                          {paymentMethod === "esewa" ? "e-Sewa" : "Khalti"} to
                          complete your payment securely.
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• Secure payment gateway</p>
                      <p>• Instant payment confirmation</p>
                      <p>• No additional charges</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Save Shipping Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveShippingInfo}
                  onChange={(e) => setSaveShippingInfo(e.target.checked)}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 rounded"
                />
                <span className="text-sm text-gray-700">
                  Save shipping information for future orders
                </span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-black mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex items-center space-x-3"
                  >
                    <img
                      src={
                        item.image
                          ? `http://localhost:5000${item.image}`
                          : "/placeholder-product.png"
                      }
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "/placeholder-product.png";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-700">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-black">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    disabled={isCouponApplied}
                  />
                  {!isCouponApplied ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Apply
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRemoveCoupon}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      Remove
                    </motion.button>
                  )}
                </div>
                {isCouponApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-600 font-medium"
                  >
                    ✓ 10% discount applied
                  </motion.div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-black">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                {isCouponApplied && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Discount</span>
                    <span className="text-green-600 font-semibold">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-black">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl mb-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>Place Order</span>
                )}
              </motion.button>

              {/* Security & Shipping Info */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <FaTruck className="text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-black">
                      Free Shipping
                    </p>
                    <p className="text-xs text-gray-700">
                      On orders over Rs. 5,000
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-black">
                      Secure Payment
                    </p>
                    <p className="text-xs text-gray-700">
                      Your data is protected
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUndo className="text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-black">
                      Easy Returns
                    </p>
                    <p className="text-xs text-gray-700">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
