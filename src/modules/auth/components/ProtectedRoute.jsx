import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Usuário não logado
  if (!user || !user.email) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 BLOQUEIO DE MEMBRO EM MINISTÉRIOS
  if (
    user.role === "membro" &&
    location.pathname.startsWith("/ministerios")
  ) {
    return (
      <div className="p-6 text-center text-sm text-base-content/60">
        Você não tem permissão para acessar os ministérios.
      </div>
    );
  }

  return children;
}
