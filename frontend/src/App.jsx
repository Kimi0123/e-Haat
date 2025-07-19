import { Routes, Route } from "react-router-dom";
import Login from "./public/Login";
import Signup from "./public/Signup";
import Homepage from "./public/Homepage";
import Aboutus from "./public/Aboutus";
import Categories from "./private/Categories";
import Deals from "./private/Deals";
import Contact from "./public/Contact";
import Changepw from "./public/Changepw";

import Cartpage from "./private/Cartpage";
import Billing from "./private/Billing";
import UserDashboard from "./private/Dashboard";
import Orderhistory from "./private/Orderhistory";
import Ordertracking from "./private/Ordertracking";
import Settings from "./private/Settings";
import Help from "./private/Help";
import Homepage_after from "./private/Homepage_after";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useAuth } from "./AuthContext";

// EhaatLanding is the same as Homepage_after
const EhaatLanding = Homepage_after;

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showSecondNav, setShowSecondNav] = useState(false);
  const { isLoggedIn } = useAuth();
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
        <Route path="/" element={<Homepage_after />} />
        {/* ✅ Make this your main home */}
        <Route path="/home" element={<Homepage />} />
        {/* <Route path="/e_" element={<Homepage_after />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/deals" element={<Deals />} /> {/* ✅ Deals route */}
        <Route path="/landing" element={<EhaatLanding />} />
        <Route path="/contact" element={<Contact />} />
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/order" element={<Orderhistory />} />
        <Route path="/dashboard/tracking" element={<Ordertracking />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/changepw" element={<Changepw />} />
        <Route path="/dashboard/help" element={<Help />} />
      </Routes>
    </div>
  );
}

export default App;
