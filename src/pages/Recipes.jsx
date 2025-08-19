// src/pages/Recipes.jsx
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";

const Recipes = () => {
  const { data } = useContext(recipecontext);
  const { user } = useAuth();

  const reciperender = data.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));
  return (
    <div className="max-w-7xl mx-auto mt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-green-500">All Recipes</h2>
        {user?.role === "admin" && (
          <Link
            className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition text-lg"
            to="/recipes/create-recipe"
          >
            Create Recipe
          </Link>
        )}
      </div>
      <div className="p-5 flex flex-wrap gap-6 justify-center bg-white rounded-lg shadow-lg min-h-[200px]">
        {data.length > 0 ? (
          reciperender
        ) : (
          <span className="text-gray-400 text-xl">No recipe found!</span>
        )}
      </div>
    </div>
  );
};

export default Recipes;
