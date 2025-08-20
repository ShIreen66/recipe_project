import React from "react";
import { FaUtensils, FaHeart, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  // Fixed food background
  const bgImage =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-4xl mx-auto backdrop-blur-md shadow-2xl rounded-2xl p-10 text-center">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-t-2xl"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-6 drop-shadow">
          About <span className="text-green-500">Us</span>
        </h1>

        <p className="text-white text-lg leading-relaxed mb-10">
          Welcome to{" "}
          <span className="font-semibold text-red-500">RecipeBook</span>! <br />
          Discover, share, and save your favorite recipes from around the
          world. Our platform is dedicated to{" "}
          <span className="font-semibold">food lovers</span> who want to explore
          new dishes, keep track of their favorites, and connect with a
          community of passionate home cooks.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {/* Easy to Use */}
          <div
            onClick={() => navigate("/")}
            className="flex flex-col items-center p-6 rounded-xl shadow-emerald-950 hover:shadow-xl transition cursor-pointer group"
          >
            <FaUtensils className="text-blue-500 text-4xl mb-3 group-hover:scale-110 transition" />
            <span className="text-blue-500 font-semibold text-lg">
              Easy to Use
            </span>
            <p className="text-white mt-2">
              Navigate recipes with ease
            </p>
          </div>

          {/* Save Favorites */}
          <div
            onClick={() => navigate("/recipes")}
            className="flex flex-col items-center  p-6 rounded-xl shadow-emerald-950 hover:shadow-xl transition cursor-pointer group"
          >
            <FaHeart className="text-red-500 text-4xl mb-3 group-hover:scale-110 transition" />
            <span className="text-red-600 font-semibold text-lg">
              Save Favorites
            </span>
            <p className="text-sm text-white mt-2">
              Keep track of your best dishes
            </p>
          </div>

          {/* Share Recipes */}
          <div
            onClick={() => alert("Share feature coming soon! 🍽️")}
            className="flex flex-col items-center  p-6 rounded-xl shadow-emerald-950 hover:shadow-xl transition cursor-pointer group"
          >
            <FaShareAlt className="text-green-500 text-4xl mb-3 group-hover:scale-110 transition" />
            <span className="text-green-600 font-semibold text-lg">
              Share Recipes
            </span>
            <p className="text-sm text-white mt-2">
              Spread your recipes worldwide
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-white text-sm">
          &copy; {new Date().getFullYear()} RecipeBook. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
