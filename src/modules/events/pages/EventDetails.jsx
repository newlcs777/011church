import { useParams, Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import useEvents from "../hooks/useEvents";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { getEventById, deleteEvent } = useEvents();
  const event = getEventById(id);

  if (!event) {
    return (
      <p className="p-6 text-sm text-base-content/60 text-center">
        Evento não encontrado.
      </p>
    );
  }

  const canEdit = user?.role === "admin" || user?.role === "pastor";

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate("/eventos");
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Link to="/eventos" className="btn btn-sm btn-ghost">
            ← Voltar
          </Link>

          {canEdit && (
            <Link to={`/eventos/editar/${event.id}`} className="btn btn-sm btn-ghost">
              Editar
            </Link>
          )}
        </div>

        {/* TÍTULO */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">{event.titulo}</h1>
          {event.descricao && (
            <p className="mt-1 text-sm text-base-content/60">{event.descricao}</p>
          )}
        </div>

        {/* INFO */}
        <div className="rounded-xl border border-base-300 bg-base-100 p-6 flex flex-col gap-4">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-xs text-base-content/50">DATA</p>
              <p className="font-medium">{event.data}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">HORÁRIO</p>
              <p className="font-medium">{event.horario}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-base-content/50">LOCAL</p>
            <p className="font-medium">{event.local || "Não informado"}</p>
          </div>
        </div>

        {/* AÇÃO PERIGOSA */}
        {canEdit && (
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-ghost text-error self-center"
          >
            Excluir evento
          </button>
        )}
      </div>
    </div>
  );
}
