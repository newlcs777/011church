import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Garantir que user realmente existe e é válido
  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
