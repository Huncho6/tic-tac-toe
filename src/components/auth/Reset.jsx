import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const navigate = useNavigate();
  const [resetData, setResetData] = useState({ resetToken: '', newPassword: '' });
  const [isShown, setIsShown] = useState(false);

  const handleShowClick = () => {
    setIsShown(!isShown);
  };

  const resetPassword = async (resetData) => {
    try {
      const response = await axios.post("http://localhost:45/auth/reset-password/user", resetData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(resetData);
      toast.success('Password reset successfully!');
      navigate("/auth/login");
    } catch (error) {
      toast.error(`Error resetting password: ${error.message}`);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col bg-white min-h-screen w-full'>
    <div className="text-center">
       {/* Replace this with the logo or image shown in the screenshot */}
    <div className="flex flex-col">
    <span className="text-6xl mb-6 font-extrabold">X O</span>
    <span className="text-6xl mb-6 font-extrabold">X O</span>
    </div>
    </div>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center bg-white w-[350px] p-8">
        <form onSubmit={handleResetPassword} className="w-full">
          <input
            type="text"
            placeholder="Reset Token"
            value={resetData.resetToken}
            onChange={(e) => setResetData({ ...resetData, resetToken: e.target.value })}
            className="w-full h-12 px-4 text-gray-950 bg-white border border-gray-300 rounded-lg mb-2"
          />
        <div className="relative">
          <input
            type={isShown ? 'text' : 'password'}
            placeholder="New Password"
            value={resetData.newPassword}
            onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
            className='w-full h-12 px-4 text-gray-950 bg-white border border-gray-300 rounded-lg mb-2'
          />
          <span className='absolute right-2 top-3 text-gray-500 cursor-pointer' onClick={handleShowClick}>
            {isShown ? 'Hide' : 'Show'}
          </span>
        </div>
          <button
            type="submit"
            className="w-full h-12 rounded-md text-black bg-white border-solid border-2 border-black font-bold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
