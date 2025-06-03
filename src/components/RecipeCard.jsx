import { Link } from "react-router-dom";

const RecipeCard = (props) => {
    const { id, image, title, chef, desc } = props.recipe;

    return (
        <Link
            to={`/recipes/details/${id}`}
            className="mr-3 mb-3 block w-[23vw] shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-200 border border-gray-100"
        >
            <img className="w-full h-[30vh] object-cover" src={image} alt="" />
            <div className="p-4">
                <h1 className="mt-2 text-2xl font-black text-gray-800">{title}</h1>
                <small className="block text-red-600 text-md mb-2">{chef}</small>
                <p className="text-gray-600">
                    {desc.slice(0, 100)}...
                    <small className="text-blue-500 cursor-pointer ml-1">more</small>
                </p>
            </div>
        </Link>
    );
};

export default RecipeCard;
