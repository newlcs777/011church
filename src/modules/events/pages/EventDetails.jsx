import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

import useAuth from "../../auth/hooks/useAuth";
import useEvents from "../hooks/useEvents";
import EventCardSkeleton from "../components/EventCardSkeleton";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { getEventById, deleteEvent } = useEvents();
  const event = getEventById(id);

  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!event) {
    return (
      <div className="p-6">
        <EventCardSkeleton />
      </div>
    );
  }

  const canEdit = user?.role === "admin" || user?.role === "pastor";

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate("/eventos");
  };

  const mapsLink = event.local
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.local
      )}`
    : null;

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col gap-6">

        {/* CARD — MESMO PADRÃO DE PESSOAS */}
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
          {/* BOTÃO EDITAR — DENTRO DO CARD */}
          {canEdit && (
            <Link
              to={`/eventos/editar/${event.id}`}
              className="
                absolute
                top-3
                right-3
                text-base-content/50
                hover:text-primary
                transition
                opacity-100
                sm:opacity-0
                sm:group-hover:opacity-100
              "
              aria-label="Editar evento"
            >
              <FaEdit size={14} />
            </Link>
          )}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* BLOCO VISUAL (DATA) */}
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
              <div className="flex sm:flex-col items-center gap-1 text-xs">
                <span className="font-semibold">
                  {event.data?.slice(8, 10)}
                </span>
                <span className="uppercase text-base-content/60">
                  {event.data?.slice(5, 7)}/{event.data?.slice(0, 4)}
                </span>
              </div>
            </div>

            {/* CONTEÚDO */}
            <div className="flex flex-col gap-2 flex-1">
              <h1 className="text-sm sm:text-base font-medium">
                {event.titulo}
              </h1>

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
                <span className="flex items-center gap-1">
                  <FaClock size={12} />
                  {event.horario}
                </span>

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
                    {event.local}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* EXCLUIR — IGUAL PADRÃO DE AÇÃO INTERNA */}
          {canEdit && (
            <div className="pt-4 border-t border-base-300 flex justify-end">
              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="
                    text-xs
                    text-error
                    hover:underline
                  "
                >
                  Excluir evento
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-base-content/60">
                    Confirmar exclusão?
                  </span>

                  <button
                    onClick={handleDelete}
                    className="
                      text-xs
                      text-error
                      hover:underline
                    "
                  >
                    Sim
                  </button>

                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="
                      text-xs
                      text-base-content/60
                      hover:underline
                    "
                  >
                    Não
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* VOLTAR */}
        <div className="flex justify-end">
         
        </div>
      </div>
    </div>
  );
}
