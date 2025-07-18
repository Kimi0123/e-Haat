// src/pages/admin/AddProduct.jsx
import React from "react";

export default function AddProduct() {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Product Name" className="input input-bordered w-full" />
        <input type="text" placeholder="Price" className="input input-bordered w-full" />
        <input type="number" placeholder="Stock" className="input input-bordered w-full" />
        <textarea placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
        <input type="file" className="file-input w-full file-input-bordered" />
        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
}
