import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaShoppingBag, FaHeadset, FaUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Navbar_after = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 shadow bg-white">
        {/* Logo + Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
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

        {/* Icons + Auth Buttons + Profile */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <FaHeart className="text-2xl text-black cursor-pointer hover:text-red-600" />
          <FaShoppingBag
            className="text-2xl text-black cursor-pointer hover:text-red-600"
            onClick={() => navigate("/cart")}
          />

          {/* Profile Icon */}
          <button
            className="relative flex items-center focus:outline-none"
            onClick={() => setProfileOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <FaUserCircle className="text-3xl text-gray-700 hover:text-red-600" />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-10 w-40 bg-white border border-gray-300 rounded shadow-md z-20">
              <button
                className="block w-full text-left px-4 py-2 bg-black text-white hover:bg-red-600 hover:text-white"
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </button>
              <button
                className="block w-full text-left px-4 py-2 bg-black text-white hover:bg-red-600 hover:text-white"
                onClick={() => {
                  setProfileOpen(false);
                  alert("Logged out!");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Line between navbars */}
      <div className="border-t border-gray-200"></div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center px-6 py-2 bg-white text-black text-sm font-medium">
        <div className="flex gap-6">
          <Link to="/" className="hover:text-red-600">
            Home
          </Link>
          <Link to="/category" className="hover:text-red-600">
            Category
          </Link>
          <Link to="/about-us" className="hover:text-red-600">
            About Us
          </Link>
          <Link to="/deals" className="hover:text-red-600">
            Deals
          </Link>
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
};

export default Navbar_after;
