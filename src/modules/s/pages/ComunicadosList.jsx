
import { Link } from "react-router-dom";
import { getComunicados } from "../services/comunicadosService";
import ComunicadoCard from "../components/ComunicadoCard";
import useAuth from "../../auth/hooks/useAuth";

export default function ComunicadosList() {
  const comunicados = getComunicados();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Comunicados</h1>

      {(user.role === "admin" || user.role === "pastor") && (
        <Link to="/comunicados/novo" className="btn btn-primary w-48">
          + Novo Comunicado
        </Link>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {comunicados.map((c) => (
          <ComunicadoCard key={c.id} comunicado={c} />
        ))}
      </div>
    </div>
  );
}
