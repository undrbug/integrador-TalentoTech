import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // leer del localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = savedUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const exists = savedUsers.some(u => u.email === email);
    if (exists) return false;
    const newUser = { email, password };
    const updatedUsers = [...savedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading,
      login, 
      logout, 
      register 
      }}>
      {children}
    </AuthContext.Provider>
  );
};
