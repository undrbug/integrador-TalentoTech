import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getMyProfile, refreshToken } from '../apiService'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  // useEffect verifica si hay una sesión activa
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await refreshToken();
        localStorage.setItem('accessToken', data.accessToken);
        
        const profileResponse = await getMyProfile();
        setUser(profileResponse.data);

      } catch (error) {
        console.log('No hay sesión activa.');
        setUser(null);
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser(email, password);
    localStorage.setItem('accessToken', data.accessToken);
    
    const profileResponse = await getMyProfile();
    setUser(profileResponse.data);
  };

  const register = async (email, password) => {
    await registerUser(email, password);
    const { data } = await loginUser(email, password);
    localStorage.setItem('accessToken', data.accessToken);
  };

  const logout = async () => {
    try {
      await logoutUser(); 
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};