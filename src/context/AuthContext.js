import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axiosInstance.get("/users/me");
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // Handle token expiration or invalid token
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return response;
      // Optionally fetch user data after sign up
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid Input format.";

      throw new Error(errorMessage);
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      //console.log(response);
      await fetchUser();
      return response;
      // Optionally fetch user data after sign in
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid Input format.";

      throw new Error(errorMessage);
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
