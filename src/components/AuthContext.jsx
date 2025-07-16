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
  try {
    const { data } = await loginUser(email, password);
    localStorage.setItem('accessToken', data.accessToken);
    
    const profileResponse = await getMyProfile();
    setUser(profileResponse.data);
    return { success: true };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    // return {
    //   success: false,
    //   message: error.response?.data?.msg || 'Error al iniciar sesión',
    // };
    throw error; 
  }
};


const register = async (name, email, password) => {
  try {
    await registerUser(name, email, password);
    return { success: true };
  } catch (error) {
    if (error.response?.data?.errors) {
      return { success: false, fieldErrors: error.response.data.errors };
    }
    if (error.response?.data?.msg) {
      return { success: false, message: error.response.data.msg };
    }
    return { success: false, message: 'Error al registrar usuario' };
  }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/login');
      } else {
        setError('El usuario ya existe');
      }
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    }
  };

  const value = {
  isAuthenticated: !!user,
  isAdmin: user?.role === 'admin',
  user,
  setUser,
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