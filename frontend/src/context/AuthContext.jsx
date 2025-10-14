import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const { success, data } = await authApi.checkSession();
      if (success) {
        setUser(data);
      }
      setIsLoading(false);
    };
    checkUserSession();
  }, []);

  const login = async (email, password) => {
    const { success, data, message } = await authApi.login({ email, password });
    if (success) {
      setUser(data);
    }
    return { success, message };
  };

  const signup = async (email, password, name) => {
    const { success, data, message } = await authApi.signup({ email, password, name });
    if (success) {
      // Automatically log in the user after successful signup
      const loginResponse = await login(email, password);
      return { success: loginResponse.success, message: loginResponse.message };
    }
    return { success, message };
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({ ...prevUser, ...updatedUserData }));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

