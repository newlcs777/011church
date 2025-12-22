import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function EventCard({ event }) {
  if (!event) return null;

  const mapsLink = event.local
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.local
      )}`
    : null;

  return (
    <div
      className="
        group
        relative
        rounded-xl
        border
        border-base-300
        bg-base-100
        p-6
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-4
          sm:gap-6
        "
      >
        {/* BLOCO VISUAL — DATA */}
        <div
          className="
            flex
            flex-row
            sm:flex-col
            items-center
            sm:justify-center
            rounded-lg
            bg-base-200
            px-3
            py-2
            sm:px-4
            sm:py-3
            min-w-0
            sm:min-w-[72px]
            text-base-content/70
            gap-2
          "
        >
          <FaCalendarAlt size={14} />
          <span className="text-sm font-semibold">
            {event.data?.slice(8, 10)}
          </span>
          <span className="text-[11px] uppercase text-base-content/60">
            {event.data?.slice(5, 7)}/{event.data?.slice(0, 4)}
          </span>
        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-2 flex-1">
          {/* TÍTULO */}
          <h3 className="text-sm sm:text-base font-medium">
            {event.titulo}
          </h3>

          {/* DESCRIÇÃO */}
          {event.descricao && (
            <p className="text-sm text-base-content/70">
              {event.descricao}
            </p>
          )}

          {/* INFOS */}
          <div
            className="
              flex
              flex-wrap
              gap-3
              text-sm
              text-base-content/60
              items-center
            "
          >
            {event.horario && (
              <span className="flex items-center gap-1">
                <FaClock size={12} />
                {event.horario}
              </span>
            )}

            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-1
                  text-primary
                  hover:underline
                "
              >
                <FaMapMarkerAlt size={12} />
                <span className="truncate max-w-[220px]">
                  {event.local}
                </span>
              </a>
            )}
          </div>

          {/* AÇÃO */}
          <div className="pt-1">
            <Link
              to={`/eventos/${event.id}`}
              className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                px-3
                py-1.5
                text-xs
                font-medium
                text-base-content/60
                hover:bg-base-200
                transition
              "
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
