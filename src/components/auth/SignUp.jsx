import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storeToLocalStorage } from '../../utils';
import { AuthContext } from '../../context/AuthContext';


const SignUp = () => {
  const { setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserDataState] = useState({ username: '', email: '', password: '' });

  const signUp = async (userData) => {
    try {
      const response = await axios.post("http://localhost:45/auth/create-account/user", userData);
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
      toast.success('Account created successfully!');

      // Navigate to the home page or another protected route
      navigate('/');
    } catch (error) {
      // Show error toast notification
      toast.error(`Error creating account: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserDataState({ ...userData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserDataState({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserDataState({ ...userData, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
