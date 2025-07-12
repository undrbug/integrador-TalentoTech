import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx'; 

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
