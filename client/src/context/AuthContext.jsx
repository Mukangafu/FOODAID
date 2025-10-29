import React, { createContext, useState, useEffect } from "react";
import API from "../api/foodaidApi"; // Axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  // Register function
  const register = async (name, email, password, role) => {
    const res = await API.post("/users/register", { name, email, password, role });
    const userData = res.data.user;
    const token = res.data.token;

    setUser(userData);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    // Check if user profile is complete
    if (!userData.phone || (role === "foodbank" && (!userData.organization || !userData.address))) {
      userData.needsProfileCompletion = true;
    }

    return userData;
  };

  // Login function
  const login = async (email, password) => {
    const res = await API.post("/users/login", { email, password });
    const userData = res.data.user;
    const token = res.data.token;

    setUser(userData);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    // Check if profile is complete
    if (!userData.phone || (userData.role === "foodbank" && (!userData.organization || !userData.address))) {
      userData.needsProfileCompletion = true;
    }

    return userData;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
  };

  // Update user info (for profile completion or updates)
  const updateUser = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
