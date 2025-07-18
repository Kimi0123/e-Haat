import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BillingPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const product = {
    name: "SUMWON Linen Skater Fit Pants",
    price: 2000,
    image: "/pants1.png",
  };

  const subtotal = product.price;
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    // Show success message
    setShowSuccess(true);

    // After 2 seconds, navigate to homepage
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
        <Navbar/>
     

      <div className="max-w-6xl mx-auto p-6 pt-20 bg-white text-black">
        <h2 className="text-3xl font-bold mb-10">Billing Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Billing Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name*"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Street Address*"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Apartment, floor, etc. (optional)"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Town/City*"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Phone Number*"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="email"
              placeholder="Email Address*"
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            />
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" className="checkbox checkbox-error" />
              <span className="text-sm">
                Save this information for faster check-out next time
              </span>
            </label>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 bg-white w-full max-w-md ml-auto space-y-4 relative">
            {/* Show success message if needed */}
            {showSuccess && (
              <div className="absolute inset-0 bg-green-100 bg-opacity-90 flex items-center justify-center rounded-lg text-green-800 font-semibold text-xl z-10">
                Order placed successfully!
              </div>
            )}

            {/* Product */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt="Product"
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{product.name}</span>
              </div>
              <span>Rs. {product.price}</span>
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total:</span>
                <span>Rs. {total}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-2 mt-4">
              {/* <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  className="radio"
                  value="esewa"
                  checked={paymentMethod === "esewa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Esewa, Khalti</span>
              </label> */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  className="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on delivery</span>
              </label>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full bg-white border border-gray-300 rounded px-4 py-2"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="btn bg-red-600 text-white hover:bg-red-700">
                Apply Coupon
              </button>
            </div>

            {/* Place Order */}
            <button
              disabled={showSuccess}
              onClick={handlePlaceOrder}
              className="btn w-full mt-4 bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
