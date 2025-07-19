// src/components/Navbar.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import bag from "../assets/bag.svg";
import ehaat from "../assets/ehaat.svg";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";

export const NAVBAR_HEIGHT = 80;
export const SECOND_NAV_HEIGHT = 48;

function Navbar({ showSecondNav, isMenuOpen, setMenuOpen, isLoggedIn }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Deals", href: "/deals" },
    { label: "Offers", href: "/offers" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    showNotification(
      "info",
      "Logged Out",
      "You have been successfully logged out."
    );
    // Optionally redirect to home page
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md text-black">
      {/* Main Navbar */}
      <div className="flex justify-between items-center h-20 px-4 md:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img src={ehaat} alt="E-Haat logo" className="h-10" />
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[250px] md:w-[400px] px-4 py-2 rounded-full border border-gray-300 focus:border-red-400 focus:outline-none shadow-sm text-black"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 relative">
          {isLoggedIn ? (
            <>
              <a href="/wishlist" className="text-sm hover:text-red-500">
                Wishlist
              </a>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="text-sm hover:text-red-500 focus:outline-none"
                >
                  Profile ▾
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Account
                    </a>
                    <a
                      href="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Orders
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <a href="/cart">
                <img src={bag} alt="Shopping Cart" className="h-6" />
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="text-sm hover:text-red-500">
                Login
              </a>
              <a
                href="/signup"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
              >
                Sign Up
              </a>
              <a href="/cart">
                <img src={bag} alt="Shopping Cart" className="h-6" />
              </a>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Secondary Navbar - Desktop Only */}
      <div
        className={`hidden md:flex justify-center items-center bg-gray-100 border-t border-gray-200 transition-all duration-300 ease-in-out transform ${
          showSecondNav
            ? "h-12 opacity-100 translate-y-0"
            : "h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex space-x-8 text-sm">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-red-500 transition-colors duration-200 font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 border-t border-gray-200"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="block py-2 hover:text-red-500 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  showSecondNav: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
