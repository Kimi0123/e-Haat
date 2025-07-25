import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "Sushmita Pandey",
    email: "sushmita@gmail.com",
    mobile: "",
    birthday: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-1 px-10 py-12 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-md p-8 max-w-3xl space-y-6"
        >
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              type="text"
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Birthday</label>
            <input
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-400"
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
