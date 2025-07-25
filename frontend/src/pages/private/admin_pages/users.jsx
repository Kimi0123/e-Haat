// src/pages/admin/Users.jsx
import React from "react";

export default function Users() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="table w-full bg-white shadow">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sushmita@gmail.com</td>
            <td>User</td>
            <td>2025-06-01</td>
          </tr>
          {/* More users */}
        </tbody>
      </table>
    </div>
  );
}
