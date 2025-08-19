// src/components/RecipeCard.jsx
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 w-80 bg-white flex flex-col">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-lg mb-3 h-40 w-full object-cover"
      />
      <h3 className="text-xl font-bold text-green-600 mb-1">{recipe.title}</h3>
      <p className="text-gray-600 text-sm mb-2">By {recipe.chef}</p>
      <p className="text-gray-700 text-sm line-clamp-2 mb-3">{recipe.desc}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-semibold text-green-700">₹{recipe.price}</span>
        <Link
          to={`/recipes/details/${recipe.id}`}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
