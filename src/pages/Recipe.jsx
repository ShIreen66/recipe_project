import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Recipe = () => {
    const navigate = useNavigate();
    const { data, setdata, favroite, setfavroite } = useContext(recipecontext);
    const { id } = useParams();
    const recipe = data.find((r) => r.id == id);
    console.log(favroite.find((r) => r.id == recipe.id));
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            image: recipe.image,
            title: recipe.title,
            chef: recipe.chef,
            desc: recipe.desc,
            ingr: recipe.ingr,
            inst: recipe.inst,
        },
    });

    const SubmitHandler = (updatedRecipe) => {
        const i = data.findIndex((r) => r.id == id);
        // code to update recipe
        console.log(data[i]);
        const copydata = [...data];
        copydata[i] = { ...recipe, ...updatedRecipe };
        setdata(copydata);
        window.localStorage.setItem("recipes", JSON.stringify(copydata));
        toast.success("recipe updated!");
        reset();
    };

    const DeleteHandler = () => {
        const filterData = data.filter((r) => r.id != id);
        setdata(filterData);
        window.localStorage.setItem("recipes", JSON.stringify(filterData));
        // remove the recipe from favroite as well if exist
        toast.success("Recipe Deleted");
        navigate("/recipes");
    };

    const FavroiteHandler = () => {
        let copyfavroite = [...favroite];
        copyfavroite.push(recipe);
        setfavroite(copyfavroite);
        window.localStorage.setItem("favroite", JSON.stringify(copyfavroite));
    };

    const UnFavroiteHandler = () => {
        const filteredfavroite = favroite.filter((f) => f.id != id);
        setfavroite(filteredfavroite);
        window.localStorage.setItem(
            "favroite",
            JSON.stringify(filteredfavroite)
        );
    };

    return recipe ? (
        <div className="mt-8 w-full min-h-screen flex flex-col md:flex-row gap-8 items-start bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg shadow-lg">
            {/* Left: Recipe Details */}
            <div className="md:w-1/2 w-full flex flex-col items-center bg-white rounded-lg shadow p-8">
                <h1 className="text-4xl font-extrabold text-green-600 mb-4 text-center">
                    {recipe.title}
                </h1>
                <img
                    className="h-[250px] w-full object-cover rounded-lg shadow mb-4"
                    src={recipe.image}
                    alt={recipe.title}
                />
                <div className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-pink-500">By:</span>
                    <span className="font-bold text-gray-700">{recipe.chef}</span>
                </div>
                <div className="mb-4 text-gray-600 text-center">
                    <span className="font-semibold">Description:</span>
                    <p className="mt-1">{recipe.desc}</p>
                </div>
                <div className="mb-4 w-full">
                    <span className="font-semibold text-gray-700">Ingredients:</span>
                    <ul className="list-disc list-inside text-gray-600 mt-1">
                        {recipe.ingr?.split(",").map((item, idx) => (
                            <li key={idx}>{item.trim()}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4 w-full">
                    <span className="font-semibold text-gray-700">Instructions:</span>
                    <ol className="list-decimal list-inside text-gray-600 mt-1">
                        {recipe.inst?.split(",").map((item, idx) => (
                            <li key={idx}>{item.trim()}</li>
                        ))}
                    </ol>
                </div>
                <div className="flex gap-4 mt-6">
                    {favroite.find((r) => r.id == recipe.id) ? (
                        <button
                            onClick={UnFavroiteHandler}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
                        >
                            Remove from Favorite
                        </button>
                    ) : (
                        <button
                            onClick={FavroiteHandler}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
                        >
                            Add to Favorite
                        </button>
                    )}
                </div>
            </div>
            {/* Right: Edit Form */}
            <form
                onSubmit={handleSubmit(SubmitHandler)}
                className="md:w-1/2 w-full bg-white rounded-lg shadow p-8 text-lg flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center text-green-500 mb-4">
                    Edit Recipe
                </h2>
                <input
                    className="w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition"
                    {...register("image")}
                    type="url"
                    placeholder="Image url"
                />
                <input
                    className="w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition"
                    {...register("title")}
                    type="text"
                    placeholder="Title"
                />
                <input
                    className="w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition"
                    {...register("chef")}
                    type="text"
                    placeholder="Chef"
                />
                <textarea
                    className="w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition resize-none"
                    {...register("desc")}
                    placeholder="Recipe description..."
                ></textarea>
                <textarea
                    className="w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition resize-none"
                    {...register("ingr")}
                    placeholder="Recipe ingredients, separated by comma"
                ></textarea>
                <textarea
                    className="w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition resize-none"
                    {...register("inst")}
                    placeholder="Recipe instructions, separated by comma"
                ></textarea>
                <select
                    className="w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition bg-white"
                    {...register("category")}
                >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="supper">Supper</option>
                    <option value="dinner">Dinner</option>
                </select>
                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-green-400 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded transition w-full"
                    >
                        Update Recipe
                    </button>
                    <button
                        onClick={DeleteHandler}
                        type="button"
                        className="bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded transition w-full"
                    >
                        Delete Recipe
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-[60vh] text-2xl text-gray-400">
            Loading...
        </div>
    );
};

export default Recipe;
