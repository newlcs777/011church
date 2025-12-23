
import { useParams, Link, useNavigate } from "react-router-dom";
import { getComunicado, deleteComunicado } from "../services/comunicadosService";
import useAuth from "../../auth/hooks/useAuth";

export default function ComunicadoDetails() {
  const { id } = useParams();
  const comunicado = getComunicado(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!comunicado) return <p className="p-4">Comunicado não encontrado.</p>;

  const handleDelete = () => {
    deleteComunicado(comunicado.id);
    navigate("/comunicados");
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/comunicados"
        className="btn btn-outline btn-sm w-24"
      >
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold">{comunicado.titulo}</h1>
      <p className="opacity-70">{comunicado.data}</p>
      <p>{comunicado.mensagem}</p>

      {(user.role === "admin" || user.role === "pastor") && (
        <div className="flex gap-3 mt-4">
          <Link
            to={`/comunicados/editar/${comunicado.id}`}
            className="btn btn-warning"
          >
            Editar
          </Link>
          <button onClick={handleDelete} className="btn btn-error">
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
