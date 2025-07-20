import React from "react";
import { formatPrice, parsePrice } from "../utils/currency";

const orders = [
  {
    id: 1,
    orderNumber: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: "Rs. 3200",
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    date: "2024-01-10",
    status: "Processing",
    total: "Rs. 1500",
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    date: "2024-01-05",
    status: "Shipped",
    total: "Rs. 700",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-yellow-100 text-yellow-800";
    case "Shipped":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrderHistory() {
  return (
    <div className="px-6 pt-[140px] pb-10 bg-white text-black max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">📋 Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order #{order.orderNumber}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">
                  Total: {formatPrice(parsePrice(order.total))}
                </div>
                <button className="btn bg-red-600 text-white hover:bg-red-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
