import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-lg shadow-md border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent tracking-tight"
        >
          Flavorly
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/favroite">Favorites</NavLink>
          <NavLink to="/about">About</NavLink>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-800 font-semibold">
                {user.name} <span className="text-gray-500">({user.role})</span>
              </span>
              <button
                onClick={logout}
                className="bg-red-500/90 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Login button */}
              <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500/90 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition shadow-md"
              >
                Login
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg px-6 py-4 flex flex-col gap-4 font-medium border-t border-gray-200">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/recipes" onClick={() => setMenuOpen(false)}>
            Recipes
          </NavLink>
          <NavLink to="/favroite" onClick={() => setMenuOpen(false)}>
            Favorites
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>

          {user ? (
            <div className="flex flex-col gap-3">
              <span className="text-sm text-gray-800 font-semibold">
                {user.name} <span className="text-gray-500">({user.role})</span>
              </span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500/90 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login-user"
                className="bg-blue-500/90 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition text-center shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Login as User
              </Link>
              <Link
                to="/login-admin"
                className="bg-green-500/90 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-600 transition text-center shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Login as Admin
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

// Custom NavLink with underline hover effect
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative text-gray-700 hover:text-green-600 transition group"
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

export default Navbar;
