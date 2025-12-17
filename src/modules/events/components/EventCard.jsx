import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  /* 🔹 SKELETON QUANDO NÃO HÁ EVENT */
  if (!event) {
    return (
      <div
        className="
          rounded-xl
          border
          border-base-300
          bg-base-100
          p-6
          animate-pulse
        "
      >
        <div className="flex gap-6">
          {/* DATA */}
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
              gap-2
            "
          >
            <div className="h-5 w-6 rounded bg-base-300" />
            <div className="h-3 w-10 rounded bg-base-300" />
          </div>

          {/* CONTEÚDO */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="h-4 w-2/3 rounded bg-base-200" />
            <div className="h-3 w-full rounded bg-base-200" />
            <div className="h-3 w-5/6 rounded bg-base-200" />

            <div className="flex gap-4 items-center">
              <div className="h-6 w-20 rounded-full bg-base-200" />
              <div className="h-3 w-32 rounded bg-base-200" />
            </div>

            <div className="pt-2">
              <div className="h-6 w-24 rounded-xl bg-base-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* 🔹 CARD NORMAL */
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
      <div className="flex gap-6">
        {/* DATA — BLOCO VISUAL */}
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

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="text-base font-medium">
            {event.titulo}
          </h2>

          {event.descricao && (
            <p className="text-sm text-base-content/70">
              {event.descricao}
            </p>
          )}

          <div
            className="
              flex
              flex-wrap
              gap-4
              text-sm
              text-base-content/60
              items-center
            "
          >
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
                text-base-content
              "
            >
              ⏰ {event.horario}
            </span>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.local || ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-base-content underline-offset-2 hover:underline"
            >
              📍 {event.local || "Não informado"}
            </a>
          </div>

          <div className="pt-2">
            <Link
              to={`/eventos/${event.id}`}
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
                transition-all
                duration-200
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                disabled:cursor-not-allowed
                disabled:opacity-60
                text-neutral/70
                hover:bg-base-200/70
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
