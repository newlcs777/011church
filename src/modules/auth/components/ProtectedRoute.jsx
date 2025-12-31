import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  // Evita renderizacao antes de saber o estado real do auth
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Usuario nao logado
  if (!user || !user.email) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // 🔒 ALUNO: só pode acessar cursos
  if (
    user.role === "aluno" &&
    !location.pathname.startsWith("/cursos")
  ) {
    return (
      <Navigate
        to="/cursos"
        replace
      />
    );
  }

  // Bloqueio de membro em rotas de ministerios
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
