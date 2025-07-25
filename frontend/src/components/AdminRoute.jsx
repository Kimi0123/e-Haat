import React from "react";
import { Navigate } from "react-router-dom";
import { useNotification } from "../NotificationContext";

const AdminRoute = ({ children }) => {
  const { showNotification } = useNotification();

  // Check if user is admin
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const adminToken = localStorage.getItem("adminToken");

  if (!isAdmin || !adminToken) {
    showNotification(
      "error",
      "Access Denied",
      "You need admin privileges to access this page."
    );
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
