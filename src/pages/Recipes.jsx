// src/pages/Recipes.jsx
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const Recipes = () => {
  const { data } = useContext(recipecontext);
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-green-600 relative inline-block">
          All Recipes
          <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></span>
        </h2>

        {user?.role === "admin" && (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/recipes/create-recipe"
              className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg transition"
            >
              <FaPlus />
              Create Recipe
            </Link>
          </motion.div>
        )}
      </div>

      {/* Recipes Grid */}
      <div className="p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-lg min-h-[200px]">
        {data.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((recipe) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 py-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="No Recipes"
              className="w-24 mb-4 opacity-70"
            />
            <span className="text-xl font-medium">No recipe found!</span>
            {user?.role === "admin" && (
              <Link
                to="/recipes/create-recipe"
                className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md"
              >
                Add First Recipe
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
