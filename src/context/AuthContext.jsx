// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // User Login
  const loginUser = (data) => {
    const newUser = {
      name: data.email.split("@")[0], // username from email
      email: data.email,
      country: data.country,
      address: data.address,
      role: "user",
    };
    setUser(newUser);
  };

  // Admin Login
  const loginAdmin = (data) => {
    const admin = {
      name: "Admin",
      email: data.email,
      role: "admin",
    };
    setUser(admin);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginUser, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
