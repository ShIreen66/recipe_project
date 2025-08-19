// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between mb-6 px-6 py-3 bg-white shadow">
      <Link to="/" className="text-2xl font-bold text-green-600">
        RecipeBook
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">
        Home
      </Link>

        <Link to="/recipes" className="hover:underline">
          Recipes
        </Link>
        <Link to="/favroite" className="hover:underline">
          Favorites
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {user.name} ({user.role})
            </span>
            <button
              onClick={logout}
              className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Login button */}
            <button
              onClick={() => setOpen(!open)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Login
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
                <Link
                  to="/login-user"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setOpen(false)}
                >
                  Login as User
                </Link>
                <Link
                  to="/login-admin"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setOpen(false)}
                >
                  Login as Admin
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
