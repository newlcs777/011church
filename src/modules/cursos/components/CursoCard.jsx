import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function CursoCard({
  curso,
  canEdit,
  onEdit,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cursos/${curso.id}`)}
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
        cursor-pointer
        hover:shadow-md
        transition
      "
    >
      {/* ✏️ EDITAR CURSO */}
      {canEdit && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(curso);
          }}
          className="
            absolute
            top-3
            right-3
            text-base-content/40
            hover:text-primary
          "
          aria-label="Editar curso"
        >
          <FaEdit size={14} />
        </button>
      )}

      {/* STATUS */}
      <span className="text-xs text-base-content/50">
        {curso.status === "published" && "Publicado"}
        {curso.status === "draft" && "Rascunho"}
        {curso.status === "archived" && "Arquivado"}
      </span>

      {/* TÍTULO */}
      <h3 className="text-sm font-semibold">
        {curso.title}
      </h3>

      {/* DESCRIÇÃO */}
      {curso.description && (
        <p className="text-xs text-base-content/60">
          {curso.description}
        </p>
      )}
    </div>
  );
}
