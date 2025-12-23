import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export default function ComunicadoCard({ comunicado }) {
  if (!comunicado) return null;

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
            {comunicado.data?.slice(8, 10)}
          </span>
          <span className="text-[11px] uppercase text-base-content/60">
            {comunicado.data?.slice(5, 7)}/{comunicado.data?.slice(0, 4)}
          </span>
        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-2 flex-1">
          {/* TÍTULO */}
          <h3 className="text-sm sm:text-base font-medium">
            {comunicado.titulo}
          </h3>

          {/* DESCRIÇÃO */}
          {comunicado.descricao && (
            <p className="text-sm text-base-content/70">
              {comunicado.descricao}
            </p>
          )}

          {/* INFORMAÇÕES */}
          {comunicado.horario && (
            <div
              className="
                flex
                items-center
                gap-1
                text-sm
                text-base-content/60
              "
            >
              <FaClock size={12} />
              <span>{comunicado.horario}</span>
            </div>
          )}

          {/* AÇÃO */}
          <div className="pt-1">
            <Link
              to={`/comunicados/${comunicado.id}`}
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
              Ler comunicado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
