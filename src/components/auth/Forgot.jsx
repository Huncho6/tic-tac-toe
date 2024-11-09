import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        "https://tic-tac-server.vercel.app/auth/forgot-password/user",
        { email }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);

      // Show success toast notification
      toast.success("Reset token sent to your email!");
      navigate("/auth/reset");
    } catch (error) {
      // Show error toast notification
      toast.error(`Error sending reset token: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white min-h-screen w-full">
      <div className="text-center">
        {/* Replace this with the logo or image shown in the screenshot */}
        <div className="flex flex-col">
          <span className="text-6xl mb-6 font-extrabold">X O</span>
          <span className="text-6xl mb-6 font-extrabold">X O</span>
        </div>
      </div>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-70  w-[350px] h-52 p-8">
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 text-gray-950 bg-white border border-gray-300 rounded-lg mb-2"
          />
          <button
            type="submit"
            className="w-full h-12 rounded-md text-black bg-white border-solid border-2 border-black font-bold"
          >
            Send Reset Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
