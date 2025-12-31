import { useParams, Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import useCursos from "../hooks/useCursos";
import PageHeader from "@/components/ui/PageHeader";
import useAuth from "@/modules/auth/hooks/useAuth";

import AulaList from "../aulas/pages/AulaList";

export default function CursoDetails() {
  const { id } = useParams();
  const { getCursoById } = useCursos();
  const { user } = useAuth();

  const curso = getCursoById(id);
  const canEdit = user?.role === "admin" || user?.role === "lider";

  if (!curso) {
    return (
      <p
        className="
          text-sm
          text-base-content/60
          text-center
          py-8
        "
      >
        Curso não encontrado.
      </p>
    );
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        md:gap-6
        pb-6
      "
    >
      {/* HEADER */}
      <PageHeader
        title={curso.titulo}
        subtitle="Conteúdo de ensino e edificação"
        align="center"
      />

      {/* CARD DO CURSO */}
      <section
        className="
          group
          relative
          bg-base-100
          border
          border-base-200
          rounded-2xl
          p-4
          md:p-6
          shadow-sm
          hover:shadow-md
          transition-all
          flex
          flex-col
          gap-4
        "
      >
        {/* ✏️ EDITAR CURSO */}
        {canEdit && (
          <Link
            to={`/cursos/editar/${curso.id}`}
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
            aria-label="Editar curso"
          >
            <FaEdit size={14} />
          </Link>
        )}

        {/* DESCRIÇÃO DO CURSO */}
        {curso.descricao && (
          <p
            className="
              text-sm
              text-base-content/70
              text-center
            "
          >
            {curso.descricao}
          </p>
        )}
      </section>

      {/* ===== AULAS DO CURSO ===== */}
      <section
        className="
          bg-base-100
          border
          border-base-200
          rounded-2xl
          p-4
          md:p-6
          shadow-sm
          flex
          flex-col
          gap-4
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            Aulas do curso
          </h2>

          {canEdit && (
            <Link
              to={`/cursos/${curso.id}/aulas/nova`}
              className="text-sm text-primary"
            >
              Nova aula
            </Link>
          )}
        </div>

        <AulaList />
      </section>
    </div>
  );
}
