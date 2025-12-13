
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEvent, deleteEvent } from "../services/eventsService";
import useAuth from "../../auth/hooks/useAuth";

export default function EventDetails() {
  const { id } = useParams();
  const event = getEvent(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!event) return <p className="p-4">Evento não encontrado.</p>;

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate("/eventos");
  };

  return (
    <div className="flex flex-col gap-4">
      <Link to="/eventos" className="btn btn-sm btn-outline w-24">
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold">{event.titulo}</h1>
      <p>{event.descricao}</p>
      <p>
        <b>Data:</b> {event.data}
      </p>
      <p>
        <b>Horário:</b> {event.horario}
      </p>
      <p>
        <b>Local:</b> {event.local}
      </p>

      {(user.role === "admin" || user.role === "pastor") && (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/eventos/editar/${event.id}`}
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
