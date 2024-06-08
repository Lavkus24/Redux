import React, { useState} from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [addpeople , setAddPeople] = useState([]);
    const [userId , setUserId] = useState(null);

    const signIn = () => {
      // Logic to set isAuthenticated to true, e.g., after successful login
      setIsAuthenticated(true);
    };
  
    const signOut = () => {
      // Logic to set isAuthenticated to false, e.g., after logout
      setIsAuthenticated(false);
    };
    
    
    
  
    return (
      <AuthContext.Provider value={{ isAuthenticated , signIn , signOut , addpeople , setAddPeople ,  userId , setUserId}}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider

  