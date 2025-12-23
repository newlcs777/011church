import { FaPlay, FaEdit } from "react-icons/fa";

export default function CursoCard({
  curso,
  canEdit,
  onEdit,
}) {
  const ordem =
    typeof curso.ordem === "number"
      ? curso.ordem
      : Number(curso.ordem);

  return (
    <div
      className="
        relative
        bg-base-100
        border
        border-base-200
        rounded-2xl
        p-4
        shadow-sm
        flex
        flex-col
        gap-3
      "
    >
      {/* ✏️ EDITAR */}
      {canEdit && (
        <button
          type="button"
          onClick={() => onEdit(curso)}
          className="
            absolute
            top-3
            right-3
            text-base-content/40
            hover:text-primary
          "
        >
          <FaEdit size={14} />
        </button>
      )}

      {/* 🔢 NÚMERO DA AULA (AGORA APARECE) */}
      {Number.isFinite(ordem) && (
        <span className="text-xs text-base-content/50">
          Aula {String(ordem).padStart(2, "0")}
        </span>
      )}

      {/* TÍTULO */}
      <h3 className="text-sm font-semibold">
        {curso.titulo}
      </h3>

      {/* DESCRIÇÃO */}
      {curso.descricao && (
        <p className="text-xs text-base-content/60">
          {curso.descricao}
        </p>
      )}

      <div className="h-px bg-base-200/70" />

      {/* CTA */}
      <a
        href={safeUrl(curso.link)}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-primary
        "
      >
        <FaPlay className="text-xs" />
        Assistir aula
      </a>
    </div>
  );
}

function safeUrl(url = "") {
  if (!url) return "#";
  const u = url.trim();
  return encodeURI(u.startsWith("http") ? u : `https://${u}`);
}
