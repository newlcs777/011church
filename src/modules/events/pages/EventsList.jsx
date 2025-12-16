import { Link } from "react-router-dom";

import EventCard from "../components/EventCard";
import useEvents from "../hooks/useEvents";
import useAuth from "../../auth/hooks/useAuth";
import { canCreateEvent } from "../utils/eventPermissions";

import PageHeader from "../../../components/ui/PageHeader";

export default function EventsList() {
  const { user } = useAuth();
  const { events, loading } = useEvents();

  const canCreate = canCreateEvent(user.role);

  if (loading) {
    return (
      <p className="p-6 text-sm text-base-content/60 text-center">
        Carregando eventos…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <PageHeader
          title="Eventos"
          subtitle="Veja os próximos eventos da igreja"
        />

        {canCreate && (
          <div className="flex justify-end">
            <Link
              to="/eventos/novo"
              className="btn btn-sm btn-ghost"
            >
              + Novo evento
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {events.length === 0 ? (
          <p className="text-sm text-base-content/60 text-center py-8">
            Ainda não há eventos cadastrados.
          </p>
        ) : (
          events.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))
        )}
      </div>
    </div>
  );
}
