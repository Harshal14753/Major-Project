import { useContext } from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { getUserProfile } from "../services/UserService";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    role: "",
  }); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  // Check for existing token on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      if (decoded.exp < currentTime) {
        // Token is expired
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        fetchUserProfile(token);
      }
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    console.log(userData)
  };

  // Fetch User Profile (Decodes JWT)
  const fetchUserProfile = async (token) => {
    try {
      const response = await getUserProfile(token);
      console.log("Fetch response ", response);

      if (response.status !== 200) throw new Error("Unauthorized");

      //   const userData = await response.json();
      //   console.log("User Data :- ", userData);
      setUser({
        fullname: response.data.fullname,
        email: response.data.email,
        role: localStorage.getItem("role"),
      });
      //   console.log(user.fullname)
      //   console.log(user.email)
      setIsAuthenticated(true); // ✅ Set authentication status
    } catch (error) {
      console.error("Profile error:", error);
      logout();
    }
  };

  // Logout function
  const logout = () => {
    setUser({
      fullname: "",
      email: "",
      role: "",
    });
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout, fetchUserProfile, setUser, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}


export const useUserContext = () => {
  return useContext(UserContext);
}