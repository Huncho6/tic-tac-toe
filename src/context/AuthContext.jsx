import { createContext, useState } from "react";
import { getFromLocalStorage, removeFromLocalStorage } from "../utils";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  //we are checking if there is any data in the local storage, if
  //there is we set it to the userData state else we set it to null
  const data = getFromLocalStorage("userData");
  const [userData, setUserData] = useState(data || null);

  const logOut = () => {
    setUserData(null);
    removeFromLocalStorage("userData");
  };
  return (
    <AuthContext.Provider value={{ userData, setUserData, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
