import { FaPlay, FaEdit } from "react-icons/fa";

export default function AulaCard({ aula, canEdit, onEdit }) {
  const ordem =
    typeof aula.ordem === "number"
      ? aula.ordem
      : Number(aula.ordem);

  function handlePlay(e) {
    e.stopPropagation();

    if (!aula.videoUrl) return;

    const url = aula.videoUrl.startsWith("http")
      ? aula.videoUrl
      : `https://${aula.videoUrl}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="
        bg-base-100
        border
        border-base-200
        rounded-xl
        p-4
        flex
        justify-between
        items-center
        hover:bg-base-200/30
        transition
      "
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">
          Aula {String(ordem).padStart(2, "0")} – {aula.titulo}
        </p>

        {aula.descricao && (
          <p className="text-xs text-base-content/60">
            {aula.descricao}
          </p>
        )}
      </div>

      <div className="flex gap-3 items-center">
        {/* ▶️ PLAY */}
        <button
          type="button"
          onClick={handlePlay}
          title="Assistir aula"
          aria-label="Assistir aula"
          className="
            text-primary
            hover:scale-105
            transition
          "
        >
          <FaPlay />
        </button>

        {/* ✏️ EDITAR */}
        {canEdit && (
          <button
            type="button"
            onClick={() => onEdit(aula)}
            title="Editar aula"
            aria-label="Editar aula"
            className="
              text-base-content/50
              hover:text-primary
              transition
            "
          >
            <FaEdit />
          </button>
        )}
      </div>
    </div>
  );
}
