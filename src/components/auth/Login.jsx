import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import { storeToLocalStorage } from '../../utils';



const Login = () => {
  const { setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserDataState] = useState({ username: '', password: '' });

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
      
      // Store user data in AuthContext and local storage
      setUserData(response);
      storeToLocalStorage("userData", response);

      // Show success toast notification
      toast.success('Logged in successfully!');

      // Navigate to the home page or another protected route
      navigate('/');
    } catch (error) {
      // Show error toast notification
      toast.error(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserDataState({ ...userData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserDataState({ ...userData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={() => navigate("/auth/signup")}>Sign up</button>
        <button onClick={() => navigate("/auth/forgot")}>Forgot</button>
      </div>
    </div>
  );
};

export default Login;
