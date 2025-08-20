import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGlobe, FaHome, FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginUser = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    country: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(formData);

    // Agar login successful hua toh Home Page par redirect
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 px-4">
      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        {/* Icon + Title */}
        <div className="flex flex-col items-center mb-8">
          <FaUserAlt className="text-green-600 text-5xl mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">User Login</h2>
          <p className="text-gray-600 text-sm mt-1">
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-green-600" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-green-600" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-green-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Country */}
          <div className="relative">
            <FaGlobe className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Address */}
          <div className="relative">
            <FaHome className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-lg font-semibold shadow-md hover:from-green-500 hover:to-green-600 transition"
          >
            Login as User
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          &copy; {new Date().getFullYear()} RecipeBook
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
