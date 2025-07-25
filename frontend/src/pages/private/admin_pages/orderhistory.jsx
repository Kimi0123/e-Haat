import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function OrderHistory() {
  // Mock order data
  const orders = [
    {
      id: "ORD123456",
      date: "2025-07-10",
      items: 3,
      total: "Rs. 3200",
      status: "Delivered",
    },
    {
      id: "ORD123457",
      date: "2025-07-05",
      items: 2,
      total: "Rs. 1500",
      status: "Pending",
    },
    {
      id: "ORD123458",
      date: "2025-06-30",
      items: 1,
      total: "Rs. 700",
      status: "Cancelled",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-1 px-8 py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="bg-white shadow rounded-lg p-6">
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.items}</td>
                      <td className="py-3 px-4">{order.total}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-red-600 hover:underline text-sm">
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
      </main>
      <Footer />
    </div>
  );
}
