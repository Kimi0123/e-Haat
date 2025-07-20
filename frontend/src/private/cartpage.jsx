import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShoppingCart, 
  FaTrash, 
  FaArrowLeft, 
  FaPlus, 
  FaMinus,
  FaTruck,
  FaCreditCard,
  FaShieldAlt,
  FaUndo,
  FaHeart,
  FaShare
} from "react-icons/fa";
import { formatPrice } from "../utils/currency";
import { useCart } from "../CartContext";
import { useNotification } from "../NotificationContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartSubtotal, clearCart } = useCart();
  const { showNotification } = useNotification();
  const [isRemoving, setIsRemoving] = useState(null);

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      showNotification("warning", "Empty Cart", "Please add items to your cart before checkout.");
      return;
    }
    navigate("/billing");
  };

  const handleRemoveItem = async (item) => {
    setIsRemoving(item.id);
    await new Promise(resolve => setTimeout(resolve, 300)); // Animation delay
    removeFromCart(item.id, item.size, item.color);
    showNotification("success", "Item Removed", `${item.name} has been removed from your cart.`);
    setIsRemoving(null);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(item);
      return;
    }
    if (newQuantity > item.stock) {
      showNotification("warning", "Stock Limit", `Only ${item.stock} items available in stock.`);
      return;
    }
    updateQuantity(item.id, newQuantity, item.size, item.color);
  };

  const handleClearCart = () => {
    clearCart();
    showNotification("success", "Cart Cleared", "All items have been removed from your cart.");
  };

  const subtotal = getCartSubtotal();
  const shipping = 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[140px] pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FaShoppingCart className="text-4xl text-gray-400" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any products yet.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </motion.button>
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
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span>Continue Shopping</span>
            </motion.button>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
            <p className="text-gray-700">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-black">Cart Items</h2>
              </div>

              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-6 border-b border-gray-100 last:border-b-0 ${
                      isRemoving === item.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image ? `http://localhost:5000${item.image}` : "/placeholder-product.png"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            e.target.src = "/placeholder-product.png";
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-black mb-1 truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-700 mb-3">
                          {item.size && (
                            <span className="bg-gray-100 px-2 py-1 rounded-full text-black">
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="bg-gray-100 px-2 py-1 rounded-full text-black">
                              Color: {item.color}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-red-600">
                            {formatPrice(item.price)}
                          </span>
                          <div className="flex items-center space-x-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <FaMinus className="text-xs text-gray-600" />
                              </motion.button>
                              <span className="w-8 text-center font-semibold text-gray-800">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <FaPlus className="text-xs text-gray-600" />
                              </motion.button>
        </div>

                            {/* Remove Button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveItem(item)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2"
                              title="Remove item"
                            >
                              <FaTrash className="text-sm" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Cart Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex justify-between items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-red-600 transition-colors"
              >
                <FaTrash className="text-sm" />
                <span>Clear Cart</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-black mb-6">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-black">Total</span>
                    <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              onClick={handleProceedToCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl mb-6"
              >
                Proceed to Checkout
              </motion.button>

              {/* Security & Shipping Info */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <FaTruck className="text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-black">Free Shipping</p>
                    <p className="text-xs text-gray-700">On orders over Rs. 5,000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-black">Secure Payment</p>
                    <p className="text-xs text-gray-700">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUndo className="text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-black">Easy Returns</p>
                    <p className="text-xs text-gray-700">30-day return policy</p>
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
