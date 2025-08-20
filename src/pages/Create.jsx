// src/pages/Create.jsx
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaImage,
  FaUtensils,
//   FaUserChef,
  FaListAlt,
  FaClipboardList,
  FaConciergeBell,
  FaUserCheck,
} from "react-icons/fa";

const steps = [
  "Image",
  "Title",
  "Chef",
  "Description",
  "Ingredients",
  "Instructions",
  "Category",
  "Confirm",
];

const Create = () => {
  const navigate = useNavigate();
  const { data, setdata } = useContext(recipecontext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(0);

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    let copydata = [...data, recipe];
    setdata(copydata);
    localStorage.setItem("recipes", JSON.stringify(copydata));
    toast.success("🎉 New recipe created!");
    navigate(-1);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-6 px-4">
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Step Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-6 flex items-center justify-center gap-2">
          {step === 0 && <FaImage />} 
          {step === 1 && <FaUtensils />} 
          {step === 2 && <FaUserCheck/>} 
          {step === 3 && <FaListAlt />} 
          {step === 4 && <FaClipboardList />} 
          {step === 5 && <FaClipboardList />} 
          {step === 6 && <FaConciergeBell />} 
          {step === 7 && <FaCheckCircle />} 
          {steps[step]}
        </h2>

        {/* Progress Bar */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex-1 h-2 mx-1 rounded-full transition-all duration-500 ${
                i <= step ? "bg-green-400" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        {/* Animated Step Content */}
        <div className="min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {step === 0 && (
                <>
                  <input
                    className="block w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    {...register("image", { required: "Image URL is required" })}
                    type="url"
                    placeholder="📷 Image URL"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image.message}</p>
                  )}
                </>
              )}
              {step === 1 && (
                <>
                  <input
                    className="block w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    {...register("title", { required: "Title is required" })}
                    type="text"
                    placeholder="🍲 Recipe Title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                  )}
                </>
              )}
              {step === 2 && (
                <>
                  <input
                    className="block w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    {...register("chef", { required: "Chef name is required" })}
                    type="text"
                    placeholder="👨‍🍳 Chef Name"
                  />
                  {errors.chef && (
                    <p className="text-red-500 text-sm">{errors.chef.message}</p>
                  )}
                </>
              )}
              {step === 3 && (
                <>
                  <textarea
                    className="block w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none resize-none"
                    {...register("desc", { required: "Description is required" })}
                    placeholder="📝 Recipe description..."
                    rows="3"
                  ></textarea>
                  {errors.desc && (
                    <p className="text-red-500 text-sm">{errors.desc.message}</p>
                  )}
                </>
              )}
              {step === 4 && (
                <>
                  <textarea
                    className="block w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none resize-none"
                    {...register("ingr", { required: "Ingredients are required" })}
                    placeholder="🥦 Ingredients (comma separated)"
                    rows="3"
                  ></textarea>
                  {errors.ingr && (
                    <p className="text-red-500 text-sm">{errors.ingr.message}</p>
                  )}
                </>
              )}
              {step === 5 && (
                <>
                  <textarea
                    className="block w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none resize-none"
                    {...register("inst", { required: "Instructions are required" })}
                    placeholder="👨‍🍳 Instructions (comma separated)"
                    rows="3"
                  ></textarea>
                  {errors.inst && (
                    <p className="text-red-500 text-sm">{errors.inst.message}</p>
                  )}
                </>
              )}
              {step === 6 && (
                <>
                  <select
                    className="block w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none bg-white"
                    {...register("category", { required: "Category is required" })}
                  >
                    <option value="">Select Category</option>
                    <option value="breakfast">🍳 Breakfast</option>
                    <option value="lunch">🥗 Lunch</option>
                    <option value="supper">🍛 Supper</option>
                    <option value="dinner">🍽️ Dinner</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category.message}</p>
                  )}
                </>
              )}
              {step === 7 && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-50 border rounded-lg p-4 space-y-2 text-sm sm:text-base"
                >
                  <p><strong>📷 Image:</strong> {watch("image")}</p>
                  <p><strong>🍲 Title:</strong> {watch("title")}</p>
                  <p><strong>👨‍🍳 Chef:</strong> {watch("chef")}</p>
                  <p><strong>📝 Desc:</strong> {watch("desc")}</p>
                  <p><strong>🥦 Ingredients:</strong> {watch("ingr")}</p>
                  <p><strong>👨‍🍳 Instructions:</strong> {watch("inst")}</p>
                  <p><strong>🍽️ Category:</strong> {watch("category")}</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Navigation */}
        <div className="mt-8 flex justify-between">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              <FaArrowLeft /> Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg bg-green-400 hover:bg-green-500 text-white font-semibold transition"
            >
              Next <FaArrowRight />
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
            >
              <FaCheckCircle /> Create Recipe
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Create;
