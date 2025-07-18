import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Implement actual password change logic here
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-1 px-8 py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Change Password</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md max-w-xl space-y-6"
        >
          <div>
            <label className="block font-medium mb-2">Current Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">New Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Save Password
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
