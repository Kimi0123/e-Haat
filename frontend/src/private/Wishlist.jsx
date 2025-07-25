import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { formatPrice } from "../utils/currency";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setWishlist([]);
          setIsLoading(false);
          return;
        }
        const response = await fetch("http://localhost:5000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setWishlist(Array.isArray(data) ? data : []);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        setWishlist([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // Optional: Remove from wishlist handler
  // const handleRemove = async (productId) => { ... };

  return (
    <div className="min-h-screen bg-gray-50 pt-[140px] pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FaHeart className="text-red-500" /> My Wishlist
        </h2>
        {isLoading ? (
          <p className="text-gray-500">Loading wishlist...</p>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20">
            <FaHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-gray-600 mb-6">
              Save items you love to your wishlist
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={
                    item.image
                      ? `http://localhost:5000${item.image}`
                      : "/placeholder-product.png"
                  }
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{ cursor: "pointer" }}
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png";
                  }}
                />
                <div className="p-4">
                  <h3
                    className="font-semibold mb-2 line-clamp-2 cursor-pointer hover:text-red-600"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {item.rating || 0}
                    </span>
                  </div>
                  <p className="text-red-600 font-bold text-lg mb-3">
                    {formatPrice(item.price)}
                  </p>
                  {/* <button
                    onClick={() => handleRemove(item.id)}
                    className="w-full border border-red-600 text-red-600 rounded-lg py-2 hover:bg-red-50 text-sm mt-2"
                  >
                    Remove
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
