import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex gap-x-10 bg-white shadow-md px-8 py-4 rounded-lg items-center">
            <NavLink
                className={(e) =>
                    `px-4 py-2 rounded transition-colors duration-200 ${e.isActive ? "text-white bg-violet-600" : "text-gray-700 hover:bg-gray-100"}`
                }
                to="/"
            >
                Home
            </NavLink>
            <NavLink
                className={(e) =>
                    `px-4 py-2 rounded transition-colors duration-200 ${e.isActive ? "text-white bg-violet-600" : "text-gray-700 hover:bg-gray-100"}`
                }
                to="/recipes"
            >
                Recipes
            </NavLink>
            <NavLink
                className={(e) =>
                    `px-4 py-2 rounded transition-colors duration-200 ${e.isActive ? "text-white bg-violet-600" : "text-gray-700 hover:bg-gray-100"}`
                }
                to="/about"
            >
                About
            </NavLink>
            <NavLink
                className={(e) =>
                    `px-4 py-2 rounded transition-colors duration-200 ${e.isActive ? "text-white bg-violet-600" : "text-gray-700 hover:bg-gray-100"}`
                }
                to="/favroite"
            >
                Favroite
            </NavLink>
        </div>
    );
};

export default Navbar;
