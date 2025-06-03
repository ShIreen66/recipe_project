import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-green-50 to-blue-50 py-16">
            <h1 className="text-5xl font-extrabold text-green-500 mb-4 drop-shadow-lg">Welcome to RecipeBook</h1>
            <p className="text-xl text-gray-700 mb-8 max-w-xl text-center">
                Discover, create, and save your favorite recipes! Explore a world of delicious dishes, share your own creations, and keep your best finds all in one place.
            </p>
            <div className="flex gap-6">
                <a href="/recipes" className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition text-lg">Browse Recipes</a>
                <a href="/create" className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition text-lg">Add New Recipe</a>
            </div>
        </div>
    );
};

export default Home;
