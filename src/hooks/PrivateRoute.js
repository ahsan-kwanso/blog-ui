import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
  /* Outlet means show whatever is inside that privateroute component, in our case seee that app.jsx profile is wrappeed within this private route */
};

export default PrivateRoute;

/*
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  // If user is not authenticated, redirect to login page
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
*/
