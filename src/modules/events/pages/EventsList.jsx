import { Link, useNavigate } from "react-router-dom";

import EventCard from "../components/EventCard";
import EventCardSkeleton from "../components/EventCardSkeleton";
import useEvents from "../hooks/useEvents";
import useAuth from "../../auth/hooks/useAuth";
import { canCreateEvent } from "../utils/eventPermissions";

import PageHeader from "../../../components/ui/PageHeader";

export default function EventsList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events, loading } = useEvents();

  const canCreate = canCreateEvent(user.role);

  /* ✅ ORDENAÇÃO POR PROXIMIDADE DE DIAS */
  const sortedEvents = [...events].sort((a, b) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateA = new Date(a.data);
    const dateB = new Date(b.data);

    const diffA = Math.ceil(
      (dateA - today) / (1000 * 60 * 60 * 24)
    );
    const diffB = Math.ceil(
      (dateB - today) / (1000 * 60 * 60 * 24)
    );

    if (diffA < 0 && diffB >= 0) return 1;
    if (diffA >= 0 && diffB < 0) return -1;

    return diffA - diffB;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <PageHeader
        title="Eventos"
        subtitle="Veja os próximos eventos da igreja"
        align="center"
      />

      {/* AÇÃO ADMIN — MESMO PADRÃO DO DNA */}
      {canCreate && (
        <div className="flex justify-end">
          <Link
            to="/eventos/novo"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-medium
              tracking-wide
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              text-neutral/70
              hover:bg-base-200/70
              whitespace-nowrap
            "
          >
            + Novo evento
          </Link>
        </div>
      )}

      {/* LISTA */}
      <div className="flex flex-col gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))
        ) : sortedEvents.length === 0 ? (
          <p className="text-sm text-base-content/60 text-center py-8">
            Ainda não há eventos cadastrados.
          </p>
        ) : (
          sortedEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))
        )}
      </div>
    </div>
  );
}
