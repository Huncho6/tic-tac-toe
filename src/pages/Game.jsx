import { Navigate } from "react-router-dom";
import Board from "../components/Display/Board";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



const Game = () => {
    const { logOut } = useContext(AuthContext);
    const { userData } = useContext(AuthContext);
    console.log(userData);
  
    if (!userData) {
      return <Navigate to="/auth/login" />;
    }
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Board  />
      <div>
        <button onClick={logOut}>logout</button>
      </div>
    </div>
  )
}

export default Game;
