import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Rotta privata per rotte con login obbligatorio
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />; // cambia il / se serve
  return children;
};
