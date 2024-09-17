import React from "react";
import { Navigate } from "react-router-dom";

// This is a protected route for admin access
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("auth-token");
  const accountType = localStorage.getItem("accountType");

  // Check if user is logged in and if they are an admin
  if (!token || accountType !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // If the user is an admin, allow them to access the route
  return children;
};

export default AdminProtectedRoute;
