import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const { data, setdata } = useContext(recipecontext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const SubmitHandler = (recipe) => {
        recipe.id = nanoid();

        let copydata = [...data];
        copydata.push(recipe);
        setdata(copydata);
        window.localStorage.setItem("recipes", JSON.stringify(copydata));
        toast.success("New recipe created!");
        reset();
        navigate(-1);
    };
    return (
        <form
            onSubmit={handleSubmit(SubmitHandler)}
            className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10 text-lg"
        >
            <h2 className="text-3xl font-bold text-center text-green-500 mb-8">
                Create a New Recipe
            </h2>
            <input
                className="mb-5 block w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition"
                {...register("image")}
                type="url"
                placeholder="Image url"
            />
            <input
                className="mb-5 block w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition"
                {...register("title")}
                type="text"
                placeholder="Title"
            />
            <input
                className="mb-5 block w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition"
                {...register("chef")}
                type="text"
                placeholder="Chef"
            />
            <textarea
                className="mb-5 block w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition resize-none"
                {...register("desc")}
                placeholder="Recipe description..."
            ></textarea>
            <textarea
                className="mb-5 block w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition resize-none"
                {...register("ingr")}
                placeholder="Recipe ingredients, separated by comma"
            ></textarea>
            <textarea
                className="mb-5 block w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition resize-none"
                {...register("inst")}
                placeholder="Recipe instructions, separated by comma"
            ></textarea>
            <select
                className="mb-5 block w-full border-b-2 border-gray-200 p-2 focus:border-green-400 outline-none transition bg-white"
                {...register("category")}
            >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="supper">Supper</option>
                <option value="dinner">Dinner</option>
            </select>
            <button className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded transition">
                Create Recipe
            </button>
        </form>
    );
};

export default Create;
