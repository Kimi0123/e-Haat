import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaClock,
  FaMapMarkerAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaHeart,
  FaShoppingBag,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaEye,
  FaStar,
  FaCalendar,
  FaPhone,
  FaEnvelope,
  FaMapMarker,
  FaCreditCard,
  FaShieldAlt,
  FaGift,
  FaPercent,
} from "react-icons/fa";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";
import { useCart } from "../CartContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { showNotification } = useNotification();
  const { cart } = useCart();

  const [activeTab, setActiveTab] = useState("overview");
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Fetch recent orders
      const ordersResponse = await fetch(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        console.log("Orders data:", ordersData);
        setRecentOrders(ordersData.slice(0, 5)); // Get last 5 orders
      } else {
        console.error("Failed to fetch orders:", ordersResponse.status);
      }

      // Fetch wishlist
      const wishlistResponse = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (wishlistResponse.ok) {
        const wishlistData = await wishlistResponse.json();
        console.log("Wishlist data:", wishlistData);
        setWishlist(wishlistData.slice(0, 4)); // Get first 4 items
      } else {
        console.error("Failed to fetch wishlist:", wishlistResponse.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showNotification(
        "error",
        "Connection Error",
        "Unable to load dashboard data."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    showNotification(
      "info",
      "Logged Out",
      "You have been successfully logged out."
    );
    navigate("/");
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getOrderStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <FaCheckCircle className="w-4 h-4" />;
      case "shipped":
        return <FaTruck className="w-4 h-4" />;
      case "processing":
        return <FaBox className="w-4 h-4" />;
      case "cancelled":
        return <FaTimesCircle className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  const dashboardTabs = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaShoppingBag /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "tracking", label: "Order Tracking", icon: <FaMapMarkerAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "help", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.firstName || "User"}!
        </h2>
        <p className="text-red-100">
          Here's what's happening with your account
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {recentOrders.length}
              </p>
            </div>
            <FaShoppingBag className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wishlist Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {wishlist.length}
              </p>
            </div>
            <FaHeart className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cart Items</p>
              <p className="text-2xl font-bold text-gray-900">{cart.length}</p>
            </div>
            <FaBox className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  recentOrders.filter((order) =>
                    ["processing", "shipped"].includes(
                      order.orderStatus?.toLowerCase()
                    )
                  ).length
                }
              </p>
            </div>
            <FaTruck className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button
            onClick={() => setActiveTab("orders")}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View All
          </button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaShoppingBag className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                  <span className="font-semibold">
                    Rs. {parseFloat(order.totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No orders yet</p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              Start Shopping
            </button>
          </div>
        )}
      </motion.div>

      {/* Wishlist Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Wishlist</h3>
          <button
            onClick={() => setActiveTab("wishlist")}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View All
          </button>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={
                    item.image
                      ? `http://localhost:5000${item.image}`
                      : "/placeholder-product.png"
                  }
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png";
                  }}
                />
                <h4 className="font-medium text-sm mb-2 line-clamp-2">
                  {item.name}
                </h4>
                <p className="text-red-600 font-semibold">
                  Rs. {parseFloat(item.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaHeart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              Discover Products
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Continue Shopping
        </button>
      </div>

      {recentOrders.length > 0 ? (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {getOrderStatusIcon(order.orderStatus)}
                    <span className="ml-2">{order.orderStatus}</span>
                  </span>
                  <span className="font-semibold text-lg">
                    Rs. {parseFloat(order.totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/order-tracking/${order.id}`)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Track Order
                  </button>
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="text-gray-600 hover:text-gray-700 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start shopping to see your orders here
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Continue Shopping
        </button>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
                             <img
                 src={item.image ? `http://localhost:5000${item.image}` : "/placeholder-product.png"}
                 alt={item.name}
                 className="w-full h-48 object-cover"
                 onError={(e) => {
                   e.target.src = "/placeholder-product.png";
                 }}
               />
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                <div className="flex items-center mb-2">
                  <FaStar className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">
                    {item.rating || 0}
                  </span>
                </div>
                <p className="text-red-600 font-bold text-lg mb-3">
                  Rs. {parseFloat(item.price).toLocaleString()}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 text-sm"
                  >
                    View Details
                  </button>
                  <button className="px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your Wishlist is Empty
          </h3>
          <p className="text-gray-600 mb-6">
            Save items you love to your wishlist
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "orders":
        return renderOrders();
      case "wishlist":
        return renderWishlist();
      case "tracking":
        return (
          <div className="text-center py-12">
            <FaMapMarkerAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Order Tracking
            </h3>
            <p className="text-gray-600 mb-6">Track your orders in real-time</p>
            <button
              onClick={() => navigate("/order-tracking")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Track Orders
            </button>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-4">Security</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/change-password")}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Change Password
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                    Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "help":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-4">Contact Support</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="w-5 h-5 text-red-600" />
                    <span>support@ehaat.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="w-5 h-5 text-red-600" />
                    <span>+977-1-2345678</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/help")}
                    className="w-full text-left text-gray-700 hover:text-red-600"
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => navigate("/contact")}
                    className="w-full text-left text-gray-700 hover:text-red-600"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-black bg-gray-50">
      {/* Content wrapper with padding to avoid overlap */}
      <div className="flex flex-1 w-full pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>
            <nav className="space-y-2">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}

              <hr className="my-4" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaSignOutAlt />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {dashboardTabs.find(tab => tab.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <button
              onClick={fetchUserData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
