import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 px-4">
      <FaExclamationTriangle className="text-red-500 text-6xl sm:text-8xl mb-6 animate-pulse" />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
        404
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition text-sm sm:text-base md:text-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
