
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // User Login
  const loginUser = async (data) => {
    if (data.email && data.password) {
      const newUser = {
        name: data.email.split("@")[0],
        email: data.email,
        country: data.country,
        address: data.address,
        role: "user",
      };
      setUser(newUser);
      return true; 
    }
    return false; 
  };

  // Admin Login
  const loginAdmin = async (data) => {
    if (data.email === "admin@me.com" && data.password === "admin") {
      const admin = {
        name: "Admin",
        email: data.email,
        role: "admin",
      };
      setUser(admin);
      return true; 
    }
    return false; 
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginUser, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
