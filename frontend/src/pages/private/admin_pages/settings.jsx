import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-1 px-8 py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="bg-white p-6 rounded-md shadow-md max-w-2xl space-y-6">
          {/* Account Preferences */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Preferences</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Email Notifications</p>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <div className={`w-11 h-6 bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${emailNotifications ? 'bg-red-600' : ''}`}>
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${emailNotifications ? 'translate-x-5' : ''}`}
                    ></div>
                  </div>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Theme Preference</p>
                <select
                  className="border px-3 py-2 rounded-md text-sm focus:outline-none"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/change-password")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
