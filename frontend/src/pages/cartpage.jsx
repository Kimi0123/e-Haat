import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 2000;
  const subtotal = quantity * unitPrice;

  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/billing"); // Navigate to billing page
  };

  return (
    <>
      <Navbar />

      <div className="px-6 pt-[140px] pb-10 bg-white text-black max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">🛒 Cart</h2>

        {/* Table Header */}
        <div className="grid grid-cols-4 font-semibold border-b py-3">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>

        {/* Cart Item */}
        <div className="grid grid-cols-4 items-center border-b py-4">
          <div className="flex gap-4 items-center">
            <img
              src="/pants1.png"
              alt="Product"
              className="w-16 h-16 object-cover rounded"
            />
            <span>SUMWON Linen Skater Fit Pants</span>
          </div>
          <div>Rs. {unitPrice}</div>
          <div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div>Rs. {subtotal}</div>
        </div>

        {/* Cart Action Buttons */}
        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <button className="btn border border-gray-400 text-black bg-white hover:bg-gray-100">
            Return To Shop
          </button>

          <button className="btn border border-gray-400 text-black bg-white hover:bg-gray-100">
            Update Cart
          </button>
        </div>

        {/* Coupon & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Coupon */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="input input-bordered w-full max-w-xs border px-4 py-2 rounded"
            />
            <button className="btn bg-red-600 text-white hover:bg-red-700 px-4">
              Apply Coupon
            </button>
          </div>

          {/* Cart Total Box */}
          <div className="border rounded p-6 w-full max-w-sm ml-auto">
            <h3 className="text-lg font-bold mb-4">Cart Total</h3>
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span>Shipping:</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between py-2 border-t font-bold">
              <span>Total:</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="btn mt-4 w-full bg-red-600 text-white hover:bg-red-700"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
