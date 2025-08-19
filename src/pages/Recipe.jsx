// src/pages/Recipe.jsx
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Recipe = () => {
  const navigate = useNavigate();
  const { data, setdata, favroite, setfavroite } = useContext(recipecontext);
  const { user } = useAuth();

  const { id } = useParams();
  const recipe = data.find((r) => String(r.id) === String(id));

  const { register, handleSubmit, reset } = useForm({
    defaultValues: recipe || {},
  });

  // ✅ Update (Admin)
  const SubmitHandler = (updatedRecipe) => {
    const i = data.findIndex((r) => String(r.id) === String(id));
    const copydata = [...data];
    copydata[i] = { 
      ...recipe, 
      ...updatedRecipe, 
      price: Number(updatedRecipe.price) || 0 // 🔥 ensure price is number
    };
    setdata(copydata);
    toast.success("Recipe updated!");
    reset(copydata[i]); // reset form with updated values
  };

  // Delete (Admin)
  const DeleteHandler = () => {
    const filterData = data.filter((r) => String(r.id) !== String(id));
    setdata(filterData);
    toast.success("Recipe Deleted");
    navigate("/recipes");
  };

  // Favorite
  const FavroiteHandler = () => {
    if (!favroite.find((r) => String(r.id) === String(recipe.id))) {
      setfavroite([...favroite, recipe]);
      toast.success("Added to Favorites!");
    }
  };

  const UnFavroiteHandler = () => {
    const filteredfavroite = favroite.filter((f) => String(f.id) !== String(id));
    setfavroite(filteredfavroite);
    toast.info("Removed from Favorites");
  };

  // ✅ Order
  const OrderHandler = () => {
    if (!user) {
      toast.error("Please login to order!");
      navigate("/login");
      return;
    }
    toast.success(`Order placed for ${recipe.title} at ₹${recipe.price || 100}`);
  };

  if (!recipe)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-2xl text-gray-400">
        Loading...
      </div>
    );

  const isFav = !!favroite.find((r) => String(r.id) === String(recipe.id));

  return (
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

        {/* Price + Actions */}
        <div className="flex flex-col gap-4 mt-6 w-full items-center">
          <span className="text-xl font-bold text-green-600">
            Price: ₹{recipe.price || 100}
          </span>

          <div className="flex gap-4 flex-wrap justify-center">
            {isFav ? (
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

            <button
              onClick={OrderHandler}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Right: Admin Edit Form */}
      {user?.role === "admin" && (
        <form
          onSubmit={handleSubmit(SubmitHandler)}
          className="md:w-1/2 w-full bg-white rounded-lg shadow p-8 text-lg flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center text-green-500 mb-4">
            Edit Recipe
          </h2>
          <input {...register("image")} type="url" placeholder="Image url" className="w-full border-b-2 p-2"/>
          <input {...register("title")} type="text" placeholder="Title" className="w-full border-b-2 p-2"/>
          <input {...register("chef")} type="text" placeholder="Chef" className="w-full border-b-2 p-2"/>
          <textarea {...register("desc")} placeholder="Recipe description..." className="w-full border-b-2 p-2"/>
          <textarea {...register("ingr")} placeholder="Ingredients, separated by comma" className="w-full border-b-2 p-2"/>
          <textarea {...register("inst")} placeholder="Instructions, separated by comma" className="w-full border-b-2 p-2"/>
          <input {...register("price", { valueAsNumber: true })} type="number" placeholder="Price" className="w-full border-b-2 p-2"/>
          
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded w-full">
              Update Recipe
            </button>
            <button type="button" onClick={DeleteHandler} className="bg-red-400 text-white px-4 py-2 rounded w-full">
              Delete Recipe
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Recipe;
