// src/pages/admin/Dashboard.jsx
import React from "react";
import { FaBoxOpen, FaUsers, FaShoppingCart } from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "125",
      icon: <FaBoxOpen className="text-3xl text-white" />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: "320",
      icon: <FaShoppingCart className="text-3xl text-white" />,
      bg: "bg-green-500",
    },
    {
      title: "Total Users",
      value: "87",
      icon: <FaUsers className="text-3xl text-white" />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`card shadow-md text-white ${stat.bg}`}>
            <div className="card-body flex flex-row items-center gap-4">
              <div className="p-4 rounded-full bg-white bg-opacity-20">
                {stat.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{stat.title}</h2>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
