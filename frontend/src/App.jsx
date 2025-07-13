import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Cart from "./pages/cartpage";
import BillingPage from "./pages/billing";
import AboutUs from "./pages/aboutus";
import Navbar from "./components/Navbar"; // if used globally
import Categories from "./pages/categories";

import UserDashboard from "./pages/Dashboard";
import OrderHistory from "./pages/orderhistory";
import OrderTracking from "./pages/ordertracking";
import Settings from "./pages/settings";
import ChangePassword from "./pages/changepw";
import Help from "./pages/help";


function App() {
  return (
    <div className="min-h-screen bg-white">
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/order" element={<OrderHistory />} />
        <Route path="/dashboard/tracking" element={<OrderTracking />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/help" element={<Help />} />
        <Route path="/dashboard/changepw" element={<ChangePassword />} />
        
        
        
      </Routes>
    </div>
  );
}

export default App;
