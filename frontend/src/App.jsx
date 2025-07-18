import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Cart from "./pages/cartpage";
import BillingPage from "./pages/billing";
import AboutUs from "./pages/aboutus";
import Categories from "./pages/categories";
import Deals from "./pages/deals"; // ✅ Import Deals page

// Dashboard related
import UserDashboard from "./pages/Dashboard";
import OrderHistory from "./pages/orderhistory";
import OrderTracking from "./pages/ordertracking";
import Settings from "./pages/settings";
import ChangePassword from "./pages/changepw";
import Help from "./pages/help";

import Homepage_after from "./pages/homepage_after";
import EhaatLanding from "./pages/homepage_after";
import Contact from "./pages/contact";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage_after />} /> {/* ✅ Make this your main home */}
        <Route path="/home" element={<Homepage />} />
        {/* <Route path="/e_" element={<Homepage_after />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/deals" element={<Deals />} /> {/* ✅ Deals route */}
        <Route path="/landing" element={<EhaatLanding />} />
        <Route path="/contact" element={<Contact />} />


        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/order" element={<OrderHistory />} />
        <Route path="/dashboard/tracking" element={<OrderTracking />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/changepw" element={<ChangePassword />} />
        <Route path="/dashboard/help" element={<Help />} />


      </Routes>
    </div>
  );
}

export default App;
