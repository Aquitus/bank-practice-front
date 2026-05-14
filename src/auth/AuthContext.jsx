import { createContext, useContext, useEffect, useState,} from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

const api = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore auth state from localStorage on app load
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     setUser({ token });
  //   }
  // }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });

      // const { token, user } = res.data;

      // Save token
      localStorage.setItem("token", token);

      // Update user state
      setUser({username});
      // setUser(user || { token });

      // return res.data;
    // } catch (error) {
    //   throw error;
    // }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    //, isAuthenticated: !!user
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};