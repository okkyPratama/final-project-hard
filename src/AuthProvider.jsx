import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from './AuthContext';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          const response = await axios.get(
            "https://dev-example.sanbercloud.com/api/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (JSON.stringify(response.data) !== JSON.stringify(parsedUser)) {
            const updatedUserData = { ...response.data, token };
            setUser(updatedUserData);
            localStorage.setItem("user", JSON.stringify(updatedUserData));
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setIsLoading(false);
      setIsInitialized(true);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://dev-example.sanbercloud.com/api/login",
        { email, password }
      );
      const { token, user } = response.data;
      const userData = { ...user, token };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      return {
        success: false,
        error: error.response ? error.response.data.error : "Login failed",
      };
    }
  };

  const register = async (name, email, password, image_url) => {
    try {
      const response = await axios.post(
        "https://dev-example.sanbercloud.com/api/register",
        { name, email, password, image_url }
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      return {
        success: false,
        error: error.response ? error.response.data : "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const changePassword = async (
    current_password,
    new_password,
    new_confirm_password
  ) => {
    try {
      await axios.post(
        "https://dev-example.sanbercloud.com/api/change-password",
        { current_password, new_password, new_confirm_password },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      return { success: true };
    } catch (error) {
      console.error("Password change failed:", error);
      return {
        success: false,
        error: error.response ? error.response.data : "Password change failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isInitialized, login, register, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;