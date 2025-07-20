import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClock,
  FaMapMarkerAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const handleLogout = () => {
    logout();
    showNotification(
      "info",
      "Logged Out",
      "You have been successfully logged out."
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col text-black bg-white">
      {/* Navbar removed, now global */}

      {/* Content wrapper with padding to avoid overlap */}
      <div className="flex flex-1 w-full pt-16">
        {/* Sidebar */}
        <aside className="w-[20%] border-r px-6 py-8">
          <ul className="space-y-6 font-medium text-gray-700">
            <li
              className="flex items-center gap-3 text-black font-semibold cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <FaUser className="w-5 h-5" /> Account
            </li>
            <li
              className="flex items-center gap-3 hover:text-red-600 cursor-pointer"
              onClick={() => navigate("/dashboard/order")}
            >
              <FaClock className="w-5 h-5" /> Order History
            </li>
            <li
              className="flex items-center gap-3 hover:text-red-600 cursor-pointer"
              onClick={() => navigate("/dashboard/tracking")}
            >
              <FaMapMarkerAlt className="w-5 h-5" /> Order Tracking
            </li>
            <li
              className="flex items-center gap-3 hover:text-red-600 cursor-pointer"
              onClick={() => navigate("/dashboard/settings")}
            >
              <FaCog className="w-5 h-5" /> Settings
            </li>
            <hr />
            <li
              className="flex items-center gap-3 hover:text-red-600 cursor-pointer"
              onClick={() => navigate("/dashboard/help")}
            >
              <FaQuestionCircle className="w-5 h-5" /> Help
            </li>
            <li
              className="flex items-center gap-3 hover:text-red-600 cursor-pointer transition-colors duration-200"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="w-5 h-5" /> Logout
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 px-12 pt-8 pb-10">
          <h1 className="text-2xl font-bold mb-6">My Account</h1>
          <div className="bg-white p-8 rounded-md shadow space-y-4 w-full">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="font-medium">Full Name:</p>
                <p>Sushmita Pandey</p>
              </div>
              <div>
                <p className="font-medium">
                  Email Address:
                  <span className="text-red-600 cursor-pointer ml-1">
                    Change
                  </span>
                </p>
                <p>sushmita@gmail.com</p>
              </div>
              <div>
                <p className="font-medium">
                  Mobile No. 9834567
                  <span className="text-red-600 cursor-pointer ml-1">
                    Change
                  </span>
                </p>
                <p>Please add your mobile number</p>
              </div>
              <div>
                <p className="font-medium">Birthday</p>
                <p>Please enter your birthday</p>
              </div>
              <div>
                <p className="font-medium">Gender</p>
                <p>Please enter your gender</p>
              </div>
            </div>

            <div className="flex gap-6 mt-6">
              <button
                onClick={() => navigate("/edit-profile")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Edit Profile
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                onClick={() => navigate("/dashboard/changepw")}
              >
                CHANGE PASSWORD
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
