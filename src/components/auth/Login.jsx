import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { storeToLocalStorage } from "../../utils";


const Login = () => {
  const { setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserDataState] = useState({ username: "", password: "" });
  const [isShown, setIsShown] = useState(false);

  const handleShowClick = () => setIsShown(!isShown);

  const login = async (userData) => {
    try {
      const response = await axios.post("http://localhost:45/auth/login/user", userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userData);
      setUserData(response);
      storeToLocalStorage("userData", response);
      toast.success("Logged in successfully!");
      setUserDataState({ username: "", password: "" });
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(`Error logging in: ${error.message}`);
      setUserDataState({ username: "", password: "" });
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-white">
       <div className="text-center">
          {/* Replace this with the logo or image shown in the screenshot */}
          <div className="flex flex-col mb-6">
          <span className="text-6xl mb-6 font-extrabold">X O</span>
          <span className="text-6xl mb-6 font-extrabold">X O</span>
          </div>
          <h2 className="text-2xl font-bold text-black mx-10">Welcome</h2>
          <p className="text-sm text-gray-500">Please Log in to continue</p>
        </div>
      <div className="flex flex-col items-center justify-center w-full max-w-xs px-4 py-6 space-y-6 bg-white rounded-lg">
        {/* Input fields */}
        <form onSubmit={handleLogin} className="flex flex-col w-full space-y-4">
          <input
            type="text"
            placeholder="Email or Username"
            value={userData.username}
            onChange={(e) => setUserDataState({ ...userData, username: e.target.value })}
            className="w-full h-12 px-4 text-gray-950 bg-white border  border-gray-300 rounded-lg"
          />
          <div className="relative">
            <input
              type={isShown ? "text" : "password"}
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserDataState({ ...userData, password: e.target.value })}
              className="w-full h-12 px-4 text-gray-950 bg-white border  border-gray-300 rounded-lg"
            />
            <span className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={handleShowClick}>
              {isShown ? "Hide" : "Show"}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button onClick={() => navigate("/auth/forgot")} className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 text-black bg-white border-solid border-2 rounded-full hover:border-black font-bold "
          >
            Login
          </button>
        </form>
      </div>
      <div className="text-right">
        Don't have an account?
            <button onClick={() => navigate("/auth/signup")} className="text-sm text-blue-600 hover:underline px-1">
              Sign Up For Free
            </button>
          </div>
    </div>
  );
};

export default Login;
