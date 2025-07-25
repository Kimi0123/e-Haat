import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaBox,
  FaEye,
  FaDownload,
  FaCalendar,
  FaFilter,
  FaTrendingUp,
  FaTrendingDown,
  FaStar,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { useNotification } from "../../NotificationContext";
import AdminNavbar from "../../components/AdminNavbar";

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalRevenue: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalProducts: 0,
      revenueGrowth: 0,
      orderGrowth: 0,
      userGrowth: 0,
    },
    salesData: [],
    topProducts: [],
    topCategories: [],
    userActivity: {
      newUsers: 0,
      pageViews: 0,
      conversionRate: 0,
    },
    geographicData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [selectedChart, setSelectedChart] = useState("sales");
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedTimeframe]);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      const adminToken = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/admin/analytics?timeframe=${selectedTimeframe}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        showNotification(
          "error",
          "Failed to fetch analytics data",
          "Please try again later."
        );
      }
    } catch (error) {
      console.error("Analytics fetch error:", error);
      showNotification(
        "error",
        "Connection Error",
        "Unable to load analytics data."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? "text-green-600" : "text-red-600";
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? <FaTrendingUp /> : <FaTrendingDown />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      {/* Header */}
      <div
        className="bg-white shadow-sm border-b"
        style={{ marginTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into your e-commerce performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
              >
                <option value="week" className="text-black">
                  Last 7 days
                </option>
                <option value="month" className="text-black">
                  Last 30 days
                </option>
                <option value="quarter" className="text-black">
                  Last 3 months
                </option>
                <option value="year" className="text-black">
                  Last year
                </option>
              </select>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaDownload className="mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <FaDollarSign className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(analyticsData.overview?.totalRevenue || 0)}
                </p>
                <div className="flex items-center text-xs">
                  <span
                    className={getGrowthColor(
                      analyticsData.overview?.revenueGrowth || 0
                    )}
                  >
                    {getGrowthIcon(analyticsData.overview?.revenueGrowth || 0)}
                  </span>
                  <span
                    className={`ml-1 ${getGrowthColor(
                      analyticsData.overview?.revenueGrowth || 0
                    )}`}
                  >
                    {Math.abs(analyticsData.overview?.revenueGrowth || 0)}% from
                    last period
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FaShoppingCart className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analyticsData.overview?.totalOrders || 0)}
                </p>
                <div className="flex items-center text-xs">
                  <span
                    className={getGrowthColor(
                      analyticsData.overview?.orderGrowth || 0
                    )}
                  >
                    {getGrowthIcon(analyticsData.overview?.orderGrowth || 0)}
                  </span>
                  <span
                    className={`ml-1 ${getGrowthColor(
                      analyticsData.overview?.orderGrowth || 0
                    )}`}
                  >
                    {Math.abs(analyticsData.overview?.orderGrowth || 0)}% from
                    last period
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analyticsData.overview?.totalUsers || 0)}
                </p>
                <div className="flex items-center text-xs">
                  <span
                    className={getGrowthColor(
                      analyticsData.overview?.userGrowth || 0
                    )}
                  >
                    {getGrowthIcon(analyticsData.overview?.userGrowth || 0)}
                  </span>
                  <span
                    className={`ml-1 ${getGrowthColor(
                      analyticsData.overview?.userGrowth || 0
                    )}`}
                  >
                    {Math.abs(analyticsData.overview?.userGrowth || 0)}% from
                    last period
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <FaBox className="text-yellow-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analyticsData.overview?.totalProducts || 0)}
                </p>
                <p className="text-xs text-gray-500">Active in catalog</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <motion.div
            className="bg-white rounded-lg shadow-sm border p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Trend
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedChart("sales")}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedChart === "sales"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Sales
                </button>
                <button
                  onClick={() => setSelectedChart("orders")}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedChart === "orders"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Orders
                </button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <FaChartLine className="text-gray-400 text-4xl mx-auto mb-2" />
                <p className="text-gray-500">
                  Chart visualization would be here
                </p>
                <p className="text-sm text-gray-400">
                  Using Chart.js or similar library
                </p>
              </div>
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            className="bg-white rounded-lg shadow-sm border p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Products
            </h3>
            <div className="space-y-3">
              {(analyticsData.topProducts || [])
                .slice(0, 5)
                .map((product, index) => (
                  <div
                    key={product.id || index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.name || "Product Name"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.category || "Category"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(product.revenue || 0)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.salesCount || 0} sales
                      </p>
                    </div>
                  </div>
                ))}
              {(!analyticsData.topProducts ||
                analyticsData.topProducts.length === 0) && (
                <div className="text-center py-8">
                  <FaBox className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">No product data available</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Performance */}
          <motion.div
            className="bg-white rounded-lg shadow-sm border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Category Performance
            </h3>
            <div className="space-y-3">
              {(analyticsData.topCategories || []).map((category, index) => (
                <div
                  key={category.name || index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {category.name || "Category"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(category.revenue || 0)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {category.percentage || 0}%
                    </p>
                  </div>
                </div>
              ))}
              {(!analyticsData.topCategories ||
                analyticsData.topCategories.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">
                    No category data available
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* User Activity */}
          <motion.div
            className="bg-white rounded-lg shadow-sm border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              User Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    New Users
                  </span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  +{analyticsData.userActivity?.newUsers || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaEye className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Page Views
                  </span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {formatNumber(analyticsData.userActivity?.pageViews || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaShoppingCart className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Conversion Rate
                  </span>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {(analyticsData.userActivity?.conversionRate || 0).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </motion.div>

          {/* Geographic Data */}
          <motion.div
            className="bg-white rounded-lg shadow-sm border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Locations
            </h3>
            <div className="space-y-3">
              {(analyticsData.geographicData || [])
                .slice(0, 5)
                .map((location, index) => (
                  <div
                    key={location.name || index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-gray-400 text-sm" />
                      <span className="text-sm font-medium text-gray-900">
                        {location.name || "Location"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(location.revenue || 0)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {location.orders || 0} orders
                      </p>
                    </div>
                  </div>
                ))}
              {(!analyticsData.geographicData ||
                analyticsData.geographicData.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">
                    No location data available
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
