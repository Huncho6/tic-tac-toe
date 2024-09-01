import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const navigate = useNavigate();
  const [resetData, setResetData] = useState({ resetToken: '', newPassword: '' });

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
    console.log('Reset Data:', resetData); // Log the data to check if it's correct
    try {
      const response = await resetPassword(resetData);
      toast.success('Password reset successfully!');
      navigate("/auth/login");
    } catch (error) {
      toast.error(`Error resetting password: ${error.message}`);
    }
  };
  
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          placeholder="Reset Token"
          value={resetData.resetToken}
          onChange={(e) => setResetData({ ...resetData, resetToken: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          value={resetData.newPassword}
          onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default Reset;
