// src/routes/Mainroutes.jsx
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Favroite from "../pages/Favroite";
import About from "../pages/About";
import Create from "../pages/Create";
import Update from "../pages/Update";
import PageNotFound from "../pages/PageNotFound";
import Recipe from "../pages/Recipe";
import LoginUser from "../pages/LoginUser";
import LoginAdmin from "../pages/LoginAdmin";
import AdminRoute from "../components/AdminRoutes";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/recipes" element={<Recipes />} />
      <Route
        path="/recipes/create-recipe"
        element={
          <AdminRoute>
            <Create />
          </AdminRoute>
        }
      />
      <Route path="/recipes/details/:id" element={<Recipe />} />
      <Route
        path="/recipes/update-recipe/:id"
        element={
          <AdminRoute>
            <Update />
          </AdminRoute>
        }
      />

      <Route path="/favroite" element={<Favroite />} />
      <Route path="/about" element={<About />} />

      {/* 👇 yeh do alag login pages */}
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/login-admin" element={<LoginAdmin />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
