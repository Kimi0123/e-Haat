import React from "react";
import { FaHeart, FaShoppingBag, FaHeadset } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // import Link here

const Profile = "https://i.pravatar.cc/300";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 shadow bg-white">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/logoe-haat.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-3xl font-extrabold text-black">e-Haat</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-xl mx-6">
          <input
            type="text"
            placeholder="Search products"
            className="flex-grow px-4 py-2 border border-gray-300 text-black placeholder-gray-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700">
            Search
          </button>
        </div>

        {/* Icons + Auth Buttons */}
        <div className="flex items-center gap-4">
          <FaHeart className="text-2xl text-black cursor-pointer" />
          <FaShoppingBag
            className="text-2xl text-black cursor-pointer"
            onClick={() => navigate("/cart")}
          />
          <button
            className="text-black border border-gray-400 px-3 py-1 rounded hover:bg-gray-100"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Line between navbars */}
      <div className="border-t border-gray-200"></div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center px-6 py-2 bg-white text-black text-sm font-medium">
        <div className="flex gap-6">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <Link to="/category" className="hover:text-red-600">Category</Link>
          <Link to="/about-us" className="hover:text-red-600">About Us</Link> {/* use /about-us as your route */}
          <Link to="/products" className="hover:text-red-600">Products</Link>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaHeadset className="text-red-600" />
          <span className="text-gray-700">Hotline</span>
          <span className="font-bold text-black">01-6675290</span>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-200"></div>
    </>
  );
}

export default Navbar;
