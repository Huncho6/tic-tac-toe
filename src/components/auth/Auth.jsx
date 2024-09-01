import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Reset from "./Reset";
import SignUp from "./SignUp";
import { useContext } from "react";
import Forgot from "./Forgot";
import { AuthContext } from "../../context/AuthContext";


const Auth = () => {
  const { userData } = useContext(AuthContext);

  // Redirect authenticated users
  if (userData) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
};

export default Auth;
