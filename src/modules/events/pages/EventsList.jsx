
import { Link } from "react-router-dom";
import { getEvents } from "../services/eventsService";
import EventCard from "../components/EventCard";
import useAuth from "../../auth/hooks/useAuth";

export default function EventsList() {
  const events = getEvents();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Eventos</h1>

      {(user.role === "admin" || user.role === "pastor") && (
        <Link to="/eventos/novo" className="btn btn-primary w-32">
          + Novo Evento
        </Link>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {events.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
}
