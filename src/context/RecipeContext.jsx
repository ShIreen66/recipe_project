import { createContext, useEffect, useState } from "react";

export const recipecontext = createContext(null);

const defaultRecipes = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    title: "Creamy Garlic Pasta",
    chef: "Alex Rivera",
    desc: "A quick, comforting pasta with a silky garlic-parmesan sauce.",
    ingr: "Spaghetti, Butter, Garlic, Cream, Parmesan, Salt, Pepper, Parsley",
    inst:
      "Boil pasta,Saute garlic,Add cream,Toss with pasta & parmesan,Season & garnish",
    price: 199,
    category: "dinner",
  },
];

const RecipeProvider = ({ children }) => {
  const [data, setdata] = useState(
    JSON.parse(localStorage.getItem("recipes")) || defaultRecipes
  );
  const [favroite, setfavroite] = useState(
    JSON.parse(localStorage.getItem("favroite")) || []
  );

  // keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("favroite", JSON.stringify(favroite));
  }, [favroite]);

  return (
    <recipecontext.Provider value={{ data, setdata, favroite, setfavroite }}>
      {children}
    </recipecontext.Provider>
  );
};

export default RecipeProvider;
