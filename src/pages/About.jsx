import React from "react";

const About = () => {
    return (
        <div className="max-w-2xl mx-auto mt-16 bg-white shadow-lg rounded-lg p-8 text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-4">About Us</h1>
            <p className="text-gray-700 text-lg mb-6">
                Welcome to <span className="font-semibold text-red-400">RecipeBook</span>!<br/>
                Discover, share, and save your favorite recipes from around the world. Our platform is dedicated to food lovers who want to explore new dishes, keep track of their favorites, and connect with a community of passionate home cooks.
            </p>
            <div className="flex flex-col gap-2 items-center">
                <span className="inline-block bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">Easy to Use</span>
                <span className="inline-block bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm font-medium">Save Favorites</span>
                <span className="inline-block bg-green-100 text-green-500 px-3 py-1 rounded-full text-sm font-medium">Share Recipes</span>
            </div>
            <p className="mt-8 text-gray-500 text-sm">&copy; {new Date().getFullYear()} RecipeBook. All rights reserved.</p>
        </div>
    );
};

export default About;
