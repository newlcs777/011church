
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{event.titulo}</h2>
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

        <Link to={`/eventos/${event.id}`} className="btn btn-primary mt-2">
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
