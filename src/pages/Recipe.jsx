// src/pages/Recipe.jsx
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart, FaUser } from "react-icons/fa";
import { MdDelete, MdShoppingCart } from "react-icons/md";

const Recipe = () => {
  const navigate = useNavigate();
  const { data, setdata, favroite, setfavroite } = useContext(recipecontext);
  const { user } = useAuth();

  const { id } = useParams();
  const recipe = data.find((r) => String(r.id) === String(id));

  const { register, handleSubmit, reset } = useForm({
    defaultValues: recipe || {},
  });

  // ✅ Update
  const SubmitHandler = (updatedRecipe) => {
    const i = data.findIndex((r) => String(r.id) === String(id));
    const copydata = [...data];
    copydata[i] = {
      ...recipe,
      ...updatedRecipe,
      price: Number(updatedRecipe.price) || 0,
    };
    setdata(copydata);
    toast.success("Recipe updated!");
    reset(copydata[i]);
  };

  // ✅ Delete
  const DeleteHandler = () => {
    const filterData = data.filter((r) => String(r.id) !== String(id));
    setdata(filterData);
    toast.success("Recipe Deleted");
    navigate("/recipes");
  };

  // ✅ Favorite
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
    <div className="mt-10 w-full min-h-screen flex flex-col md:flex-row gap-10 items-start bg-gradient-to-br from-green-50 via-white to-blue-50 p-8 rounded-xl shadow-xl">
      
      {/* Left: Recipe Details */}
      <div className=" w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 flex flex-col">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6 text-center">
          {recipe.title}
        </h1>

        <img
          className="h-[300px] w-full object-cover rounded-xl shadow-md mb-6"
          src={recipe.image}
          alt={recipe.title}
        />

        <div className="flex items-center gap-2 mb-6 text-gray-700 text-lg">
          <FaUser className="text-green-500" />
          <span className="font-semibold">{recipe.chef}</span>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 text-lg mb-2">
            Description:
          </h2>
          <p className="text-gray-600">{recipe.desc}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 text-lg mb-2">
            Ingredients:
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {recipe.ingr?.split(",").map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 text-lg mb-2">
            Instructions:
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            {recipe.inst?.split(",").map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ol>
        </div>

        {/* Price + Actions */}
        <div className="flex flex-col gap-5 mt-auto items-center">
          <span className="text-2xl font-bold text-green-600">
            Price: ₹{recipe.price || 100}
          </span>

          <div className="flex flex-wrap gap-4 justify-center">
            {isFav ? (
              <button
                onClick={UnFavroiteHandler}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition"
              >
                <FaHeart /> Remove Favorite
              </button>
            ) : (
              <button
                onClick={FavroiteHandler}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition"
              >
                <FaRegHeart /> Add Favorite
              </button>
            )}

            <button
              onClick={OrderHandler}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition"
            >
              <MdShoppingCart /> Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Right: Admin Edit Form */}
      {user?.role === "admin" && (
        <form
          onSubmit={handleSubmit(SubmitHandler)}
          className="md:w-1/2 w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 text-lg flex flex-col gap-5"
        >
          <h2 className="text-3xl font-bold text-center text-green-500 mb-4">
            ✏️ Edit Recipe
          </h2>
          <input {...register("image")} type="url" placeholder="Image URL" className="input-style"/>
          <input {...register("title")} type="text" placeholder="Title" className="input-style"/>
          <input {...register("chef")} type="text" placeholder="Chef" className="input-style"/>
          <textarea {...register("desc")} placeholder="Recipe description..." className="input-style"/>
          <textarea {...register("ingr")} placeholder="Ingredients, separated by comma" className="input-style"/>
          <textarea {...register("inst")} placeholder="Instructions, separated by comma" className="input-style"/>
          <input {...register("price", { valueAsNumber: true })} type="number" placeholder="Price" className="input-style"/>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full shadow-md transition">
              Update Recipe
            </button>
            <button type="button" onClick={DeleteHandler} className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full shadow-md transition">
              <MdDelete /> Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Recipe;
