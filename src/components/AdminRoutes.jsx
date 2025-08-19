// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/recipes" replace />;
  return children;
};

export default AdminRoute;
