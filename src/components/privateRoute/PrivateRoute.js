import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function PrivateRoute({ children }) {
  const admin = useSelector((state) => state.adminInfo.admin);
  return admin.uid ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
