import { Routes, Route } from "react-router-dom";
import Login from "./public/Login";
import Signup from "./public/Signup";
import Homepage from "./public/Homepage";
import AboutUs from "./public/AboutUs";
import Categories from "./private/Categories";
import Deals from "./private/Deals";
import Contact from "./public/Contact";
import ChangePw from "./public/ChangePw";
import ProductPage from "./private/ProductPage";
import SearchResults from "./public/SearchResults";
import AdminLogin from "./public/AdminLogin";
import AdminRoute from "./components/AdminRoute";

import CartPage from "./private/CartPage";
import Billing from "./private/Billing";
import UserDashboard from "./private/Dashboard";
import OrderHistory from "./private/orderhistory";
import OrderTracking from "./private/OrderTracking";
import Settings from "./private/Settings";
import Help from "./private/Help";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

// Admin Components
import AdminDashboard from "./private/admin_pages/Dashboard";
import AdminOrders from "./private/admin_pages/orders";
import AdminUsers from "./private/admin_pages/users";
import AdminProducts from "./private/admin_pages/products";
import AdminSettings from "./private/admin_pages/settings";
import AddProduct from "./private/admin_pages/add_product";
import EditProduct from "./private/admin_pages/edit_product";

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
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/search/:query" element={<SearchResults />} />

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

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/edit/:productId"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
