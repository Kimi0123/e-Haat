import { Routes, Route } from "react-router-dom";
import Login from "./public/Login";
import Signup from "./public/Signup";
import Homepage from "./public/Homepage";
import AboutUs from "./public/AboutUs";
import Categories from "./private/Categories";
import Deals from "./private/Deals";
import Contact from "./public/Contact";
import ChangePw from "./public/ChangePw";

import CartPage from "./private/CartPage";
import Billing from "./private/Billing";
import UserDashboard from "./private/Dashboard";
import OrderHistory from "./private/OrderHistory";
import OrderTracking from "./private/OrderTracking";
import Settings from "./private/Settings";
import Help from "./private/Help";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showSecondNav, setShowSecondNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isLoggedIn } = useAuth();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Only show second nav on desktop (md and up)
    if (window.innerWidth < 768) {
      setShowSecondNav(false);
      return;
    }

    // Show navbar when scrolling up, hide when scrolling down
    if (currentScrollY < lastScrollY) {
      // Scrolling up
      setShowSecondNav(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down and not at the very top
      setShowSecondNav(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Throttled scroll listener for better performance
    let ticking = false;

    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        showSecondNav={showSecondNav}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/landing" element={<Homepage />} />

        {/* Private Routes */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <Billing />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/deals"
          element={
            <PrivateRoute>
              <Deals />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/order"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/tracking"
          element={
            <PrivateRoute>
              <OrderTracking />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/changepw"
          element={
            <PrivateRoute>
              <ChangePw />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/help"
          element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
