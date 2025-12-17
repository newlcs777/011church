import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

  /* ✅ SKELETON ENQUANTO CARREGA */
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

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* BARRA DE AÇÕES */}
        <div className="flex items-center justify-between">
          {canEdit ? (
            <Link
              to={`/eventos/editar/${event.id}`}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-3
                py-1.5
                text-xs
                font-medium
                tracking-wide
                text-neutral/70
                transition-all
                duration-200
                hover:bg-base-200/70
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
              "
            >
              Editar
            </Link>
          ) : (
            <span />
          )}

          <Link
            to="/eventos"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-3
              py-1.5
              text-xs
              font-medium
              tracking-wide
              text-neutral/70
              transition-all
              duration-200
              hover:bg-base-200/70
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
            "
          >
            Voltar
          </Link>
        </div>

        {/* CARD */}
        <div
          className="
            rounded-xl
            border
            border-base-300
            bg-base-100
            p-6
            flex
            flex-col
            gap-6
          "
        >
          {/* CONTEÚDO */}
          <div className="flex gap-6">
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-lg
                bg-base-200
                px-4
                py-3
                min-w-[72px]
              "
            >
              <span className="text-lg font-semibold">
                {event.data?.slice(8, 10)}
              </span>
              <span className="text-[11px] text-base-content/60 uppercase">
                {event.data?.slice(5, 7)}/{event.data?.slice(0, 4)}
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <h1 className="text-lg font-semibold">
                {event.titulo}
              </h1>

              {event.descricao && (
                <p className="text-sm text-base-content/70">
                  {event.descricao}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-base-content/60 items-center">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-base-200
                    px-3
                    py-1
                    text-sm
                    font-medium
                  "
                >
                  ⏰ {event.horario}
                </span>

                <span>
                  📍 {event.local || "Não informado"}
                </span>
              </div>
            </div>
          </div>

          {/* EXCLUIR — DENTRO DO CARD */}
          {canEdit && (
            <div className="pt-4 border-t border-base-300 flex flex-col items-center gap-3">
              {!confirmDelete ? (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    tracking-wide
                    text-error
                    transition-all
                    duration-200
                    hover:bg-error/10
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-error
                  "
                >
                  Excluir evento
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-base-content/60">
                    Você tem certeza?
                  </span>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      tracking-wide
                      text-error
                      transition-all
                      duration-200
                      hover:bg-error/10
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-error
                    "
                  >
                    Sim, excluir
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      tracking-wide
                      text-neutral/70
                      transition-all
                      duration-200
                      hover:bg-base-200/70
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary
                    "
                  >
                    Não
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
