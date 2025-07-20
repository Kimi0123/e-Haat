import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatPrice } from "../utils/currency";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
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

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
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

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setOrders([]);
          setIsLoading(false);
          return;
        }
        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(Array.isArray(data) ? data : []);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 pt-[140px] pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FaBox className="text-red-500" /> Order History
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mr-4"></div>
            <span className="text-gray-500 text-lg">Loading orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <FaBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
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
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {order.orderNumber || order.id}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          order.orderStatus
                        )}`}
                      >
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus || "-"}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-red-600">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="py-4 px-4">
                      <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium border border-red-200 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
