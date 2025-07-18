// src/pages/admin/ManageProducts.jsx
import React from "react";

export default function ManageProducts() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="btn btn-primary">+ Add Product</button>
      </div>
      <table className="table w-full bg-white shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iPhone 15</td>
            <td>Rs. 104,100</td>
            <td>10</td>
            <td>
              <button className="btn btn-sm btn-warning mr-2">Edit</button>
              <button className="btn btn-sm btn-error">Delete</button>
            </td>
          </tr>
          {/* More rows */}
        </tbody>
      </table>
    </div>
  );
}
