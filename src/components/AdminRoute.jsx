import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-5">Cargando sesión...</div>;

  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
