// src/components/RecipeCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl overflow-hidden shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200 flex flex-col"
    >
      {/* Image with hover overlay */}
      <div className="relative group">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-3">
          <Link
            to={`/recipes/details/${recipe.id}`}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-md transition"
          >
            View Recipe
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-green-700 mb-1 line-clamp-1">
          {recipe.title}
        </h3>

        <p className="text-gray-500 text-sm mb-2 flex items-center gap-2">
          <FaUser className="text-green-500" size={14} />
          {recipe.chef}
        </p>

        <p className="text-gray-700 text-sm line-clamp-2 mb-4">
          {recipe.desc}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-green-600 text-lg">
            ₹{recipe.price}
          </span>
          <Link
            to={`/recipes/details/${recipe.id}`}
            className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-md transition"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
