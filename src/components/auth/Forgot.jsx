import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
const navigate = useNavigate();
const [email, setEmail] = useState('');

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post("http://localhost:45/auth/forgot-password/user", { email });
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
      toast.success('Reset token sent to your email!');
      navigate("/auth/reset"); 
    } catch (error) {
      // Show error toast notification
      toast.error(`Error sending reset token: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Token</button>
      </form>
    </div>
  );
};

export default Forgot;
