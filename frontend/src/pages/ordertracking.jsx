import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState(null);

  const handleTrackOrder = () => {
    // Mock data for demonstration
    if (orderId === "ORD123456") {
      setTrackingData([
        { status: "Order Placed", date: "2025-07-10", completed: true },
        { status: "Packed", date: "2025-07-11", completed: true },
        { status: "Shipped", date: "2025-07-12", completed: true },
        { status: "Out for Delivery", date: "2025-07-13", completed: false },
      ]);
    } else {
      setTrackingData([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-1 px-8 py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

        <div className="bg-white p-6 rounded-md shadow-md max-w-2xl w-full">
          <p className="mb-2 font-medium text-gray-700">Enter Order ID</p>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g. ORD123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button
              onClick={handleTrackOrder}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Track Order
            </button>
          </div>

          {trackingData && trackingData.length > 0 ? (
            <ul className="space-y-4">
              {trackingData.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-md ${
                    step.completed ? "bg-green-50" : "bg-yellow-50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 mt-1 rounded-full ${
                      step.completed ? "bg-green-500" : "bg-yellow-400"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{step.status}</p>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : trackingData && trackingData.length === 0 ? (
            <p className="text-red-600 font-semibold">No tracking info found for this ID.</p>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
