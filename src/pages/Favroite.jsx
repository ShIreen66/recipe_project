// src/pages/Favroite.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Favroite = () => {
  const { favroite } = useContext(recipecontext);

  const reciperender = favroite.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-red-500 mb-10 text-center">
        ❤️ Your Favorite Recipes
      </h2>

      {/* Recipes Grid / Empty State */}
      <div className="p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl shadow-lg">
        {favroite.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {reciperender}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4206/4206277.png"
              alt="Empty Favorites"
              className="w-28 h-28 opacity-70 mb-6"
            />
            <p className="text-gray-500 text-lg mb-6">
              You haven’t added any favorites yet. 💔
            </p>
            <Link
              to="/recipes"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md transition font-semibold"
            >
              🍲 Go to Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favroite;
