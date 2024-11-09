import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeToLocalStorage } from "../../utils";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const { setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserDataState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isShown, setIsShown] = useState(false);

  const handleShowClick = () => {
    setIsShown(!isShown);
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post(
        "https://tic-tac-server.vercel.app/auth/create-account/user",
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(userData);

      // Store user data in AuthContext and local storage
      setUserData(response);
      storeToLocalStorage("userData", response);

      // Show success toast notification
      toast.success("Account created successfully!");

      // Navigate to the home page or another protected route
      navigate("/");
    } catch (error) {
      // Show error toast notification
      toast.error(`Error creating account: ${error.message}`);
    }
  };

  return (
    <>
      <div className="text-center">
        {/* Replace this with the logo or image shown in the screenshot */}
        <div className="flex flex-col mb-6 mt-16">
          <span className="text-6xl mb-6 font-extrabold">X O</span>
          <span className="text-6xl mb-6 font-extrabold">X O</span>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full max-w-xs px-4  bg-white rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-950 mb-5">Sign Up</h1>
          <p className="text-sm text-gray-500 mb-5">
            Enter your details below to play this classic
          </p>
          <ToastContainer />
          <form
            onSubmit={handleSignUp}
            className="flex flex-col gap-4 justify-between w-full"
          >
            <input
              type="text"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserDataState({ ...userData, email: e.target.value })
              }
              className="w-full h-12 px-4 text-gray-950 bg-white border  border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Username"
              value={userData.username}
              onChange={(e) =>
                setUserDataState({ ...userData, username: e.target.value })
              }
              className="w-full h-12 px-4 text-gray-950 bg-white border  border-gray-300 rounded-lg"
            />
            <div className="relative">
              <input
                type={isShown ? "text" : "password"}
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserDataState({ ...userData, password: e.target.value })
                }
                className="w-full h-12 px-4 text-gray-950 bg-white border border-gray-300 rounded-lg"
              />
              <span
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={handleShowClick}
              >
                {isShown ? "Hide" : "Show"}
              </span>
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-full border-solid border-2 hover:border-black font-bold"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-2">
            Already have an account?
            <button
              onClick={() => navigate("/auth/login")}
              className="text-sm text-blue-600 hover:underline px-1"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
