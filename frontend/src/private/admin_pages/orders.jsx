// src/pages/admin/Orders.jsx
import React from "react";

export default function Orders() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="table w-full bg-white shadow">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#ORD1234</td>
            <td>sushmita@gmail.com</td>
            <td>Rs. 12,000</td>
            <td>
              <select className="select select-sm border border-gray-300">
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
