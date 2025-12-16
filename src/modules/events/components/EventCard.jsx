import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-base-300
        bg-base-100
        p-6
      "
    >
      <div className="flex flex-col gap-5">
        {/* TÍTULO */}
        <div>
          <h2
            className="
              text-base
              font-medium
            "
          >
            {event.titulo}
          </h2>

          {event.descricao && (
            <p
              className="
                mt-1
                text-sm
                text-base-content/70
              "
            >
              {event.descricao}
            </p>
          )}
        </div>

        {/* INFO */}
        <div
          className="
            flex
            flex-wrap
            gap-8
            text-sm
          "
        >
          <div>
            <p className="text-xs text-base-content/50">
              Data
            </p>
            <p className="text-base-content/80">
              {event.data}
            </p>
          </div>

          <div>
            <p className="text-xs text-base-content/50">
              Horário
            </p>
            <p className="text-base-content/80">
              {event.horario}
            </p>
          </div>

          <div>
            <p className="text-xs text-base-content/50">
              Local
            </p>
            <p className="text-base-content/80">
              {event.local || "Não informado"}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <Link
            to={`/eventos/${event.id}`}
            className="
              text-sm
              text-base-content/60
              hover:text-base-content
              transition
            "
          >
            Ver detalhes →
          </Link>
        </div>
      </div>
    </div>
  );
}
