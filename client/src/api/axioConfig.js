import React, { createContext, useState, useEffect } from "react";
import API from "../api/foodaidApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {name, email, role, token}
  const [loading, setLoading] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("foodaid_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Register user
  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      const res = await API.post("/users/register", { name, email, password, role });
      const data = res.data; // {user, token}
      setUser(data.user);
      localStorage.setItem("foodaid_user", JSON.stringify(data.user));
      localStorage.setItem("foodaid_token", data.token);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      throw err.response?.data || err;
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/users/login", { email, password });
      const data = res.data; // {user, token}
      setUser(data.user);
      localStorage.setItem("foodaid_user", JSON.stringify(data.user));
      localStorage.setItem("foodaid_token", data.token);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      throw err.response?.data || err;
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("foodaid_user");
    localStorage.removeItem("foodaid_token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
