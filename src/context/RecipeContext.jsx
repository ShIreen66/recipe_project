import { createContext, useState } from "react";
export const recipecontext = createContext(null);
const RecipeContext = (props) => {
    const [data, setdata] = useState(
        JSON.parse(window.localStorage.getItem("recipes")) || []
    );
    const [favroite, setfavroite] = useState(
        JSON.parse(window.localStorage.getItem("favroite")) || []
    );

    return (
        <recipecontext.Provider
            value={{ data, setdata, favroite, setfavroite }}
        >
            {props.children}
        </recipecontext.Provider>
    );
};

export default RecipeContext;
