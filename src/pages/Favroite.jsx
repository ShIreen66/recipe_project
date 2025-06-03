import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Favroite = () => {
    const { favroite } = useContext(recipecontext);
    console.log(favroite);
    const reciperender = favroite.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    return (
        <div className="max-w-7xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-red-400 mb-8 text-center">Your Favorite Recipes</h2>
            <div className="p-5 flex flex-wrap gap-6 justify-center bg-white rounded-lg shadow-lg min-h-[200px]">
                {favroite.length > 0 ? reciperender : (
                    <span className="text-gray-400 text-xl">No recipe found!</span>
                )}
            </div>
        </div>
    );
};

export default Favroite;
