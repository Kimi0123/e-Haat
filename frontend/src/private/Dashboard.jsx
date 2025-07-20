import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";
import { useCart } from "../CartContext";
import { formatPrice } from "../utils/currency";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser, isLoggedIn } = useAuth();
  const { showNotification } = useNotification();
  const { cart } = useCart();

  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("dashboardActiveTab") || "overview"
  );
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetchDashboardData();
    } else {
      setOrders([]);
      setWishlist([]);
      setIsLoading(false);
    }
  }, [isLoggedIn, currentUser, location]);

  // Persist activeTab in localStorage
  useEffect(() => {
    localStorage.setItem("dashboardActiveTab", activeTab);
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setOrders([]);
        setWishlist([]);
        setIsLoading(false);
        return;
      }
      // Fetch orders
      const ordersRes = await fetch(
        "http://localhost:5000/api/orders/my-orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const ordersData = ordersRes.ok ? await ordersRes.json() : [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      // Fetch wishlist
      const wishlistRes = await fetch("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const wishlistData = wishlistRes.ok ? await wishlistRes.json() : [];
      setWishlist(Array.isArray(wishlistData) ? wishlistData : []);
    } catch (err) {
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
    if (!status || typeof status !== "string")
      return "text-gray-600 bg-gray-100";
    switch (status.toLowerCase()) {
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
    if (!status || typeof status !== "string")
      return <FaClock className="w-4 h-4" />;
    switch (status.toLowerCase()) {
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

  const getOrderStatusTableStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getOrderStatusTableIcon = (status) => {
    switch ((status || "").toLowerCase()) {
      case "delivered":
        return <FaCheckCircle className="text-green-500 mr-1" />;
      case "processing":
        return <FaBox className="text-yellow-500 mr-1" />;
      case "shipped":
        return <FaTruck className="text-blue-500 mr-1" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500 mr-1" />;
      default:
        return <FaClock className="text-gray-400 mr-1" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };
  const capitalize = (str) =>
    str && typeof str === "string"
      ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      : "-";

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaShoppingBag /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "tracking", label: "Order Tracking", icon: <FaMapMarkerAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "help", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  // Overview
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back,{" "}
          {currentUser?.name ||
            currentUser?.firstName ||
            currentUser?.email ||
            "User"}
          !
        </h2>
        <p className="text-red-100">
          Here's what's happening with your account
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
            </div>
            <FaShoppingBag className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wishlist Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {wishlist.length}
              </p>
            </div>
            <FaHeart className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cart Items</p>
              <p className="text-2xl font-bold text-gray-900">{cart.length}</p>
            </div>
            <FaBox className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  orders.filter((order) =>
                    ["processing", "shipped"].includes(
                      (order.orderStatus || "").toLowerCase()
                    )
                  ).length
                }
              </p>
            </div>
            <FaTruck className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button
            onClick={() => setActiveTab("orders")}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left text-gray-700 font-semibold">
                    Order #
                  </th>
                  <th className="py-2 px-3 text-left text-gray-700 font-semibold">
                    Date
                  </th>
                  <th className="py-2 px-3 text-left text-gray-700 font-semibold">
                    Status
                  </th>
                  <th className="py-2 px-3 text-left text-gray-700 font-semibold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-3 font-semibold text-gray-900 max-w-[100px] truncate">
                      {order.orderNumber || order.id || "-"}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusTableStyle(
                          order.orderStatus
                        )}`}
                      >
                        {getOrderStatusTableIcon(order.orderStatus)}
                        {capitalize(order.orderStatus)}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-red-600">
                      {formatPrice(order.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
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
                  Rs.{" "}
                  {item.price ? parseFloat(item.price).toLocaleString() : "-"}
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
      </div>
    </div>
  );

  // My Orders
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
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Order #
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Total
                </th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 font-semibold text-gray-900 max-w-[120px] truncate">
                    {order.orderNumber || order.id || "-"}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusTableStyle(
                        order.orderStatus
                      )}`}
                    >
                      {getOrderStatusTableIcon(order.orderStatus)}
                      {capitalize(order.orderStatus)}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-red-600">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/order-tracking/${order.id}`)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg font-medium border border-red-200 transition-colors text-sm"
                      >
                        Track Order
                      </button>
                      <button
                        onClick={() => navigate(`/order/${order.id}`)}
                        className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium border border-gray-200 transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

  // Wishlist
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
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={
                  item.image
                    ? `http://localhost:5000${item.image}`
                    : "/placeholder-product.png"
                }
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
                  Rs.{" "}
                  {item.price ? parseFloat(item.price).toLocaleString() : "-"}
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
            </div>
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

  // Main content switch
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "orders":
        return renderOrders();
      case "wishlist":
        return renderWishlist();
      case "tracking":
        return renderTracking();
      case "settings":
        return renderSettings();
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
      <div className="flex flex-1 w-full pt-16">
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>
            <nav className="space-y-2">
              {tabs.map((tab) => (
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
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {tabs.find((tab) => tab.id === activeTab)?.label || "Dashboard"}
            </h1>
            <button
              onClick={fetchDashboardData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
