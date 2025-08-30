// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUtensils, FaPlusCircle } from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520080906273-ac3114063b21?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Floating Blur Circles */}
      <div className="absolute top-10 left-5 w-36 h-36 sm:w-52 sm:h-52 lg:w-72 lg:h-72 bg-green-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-36 h-36 sm:w-52 sm:h-52 lg:w-72 lg:h-72 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 max-w-lg sm:max-w-xl md:max-w-2xl text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to Flavorly
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-4 mb-8 leading-relaxed">
          Discover, create, and save your favorite recipes! Explore a world of
          delicious dishes, share your own creations, and keep your best finds
          all in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
            <Link
              to="/recipes"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all text-sm sm:text-base md:text-lg"
            >
              <FaUtensils size={18} />
              Browse Recipes
            </Link>
          </motion.div>

          {user?.role === "admin" && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/recipes/create-recipe"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all text-sm sm:text-base md:text-lg"
              >
                <FaPlusCircle size={18} />
                Add New Recipe
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
