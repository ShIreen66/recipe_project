// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUtensils, FaPlusCircle } from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Blur Circles */}
      <div className="absolute top-10 left-5 w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-green-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 max-w-lg sm:max-w-xl md:max-w-2xl text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to RecipeBook
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
              <FaUtensils size={7} className="sm:size-10" />
              Browse Recipes
            </Link>
          </motion.div>

          {user?.role === "admin" && (
            <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
              <Link
                to="/recipes/create-recipe"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all text-sm sm:text-base md:text-lg"
              >
                <FaPlusCircle size={18} className="sm:size-10"/>
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
