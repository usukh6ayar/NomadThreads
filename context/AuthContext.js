// context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { getData, saveData, removeData } from "../lib/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in when app starts
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userData = await getData("user");
      if (userData && userData.isLoggedIn) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // In a real app, you would validate credentials with a backend
      const userData = { email, isLoggedIn: true };
      await saveData("user", userData);
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await removeData("user");
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  const register = async (userData) => {
    // In a real app, you would send this data to a backend
    // For now, just return true to simulate success
    return true;
  };

  const verifyEmail = async (email, code) => {
    // In a real app, you would verify this with a backend
    // For now, just return true if code is 6 digits
    return code.length === 6;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
