import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import useCursoDetailsController from "../ui/useCursoDetailsController";

import PageHeader from "@/components/ui/PageHeader";
import AulaList from "../aulas/pages/AulaList";

export default function CursoDetails() {
  const { curso, loading, permissions } =
    useCursoDetailsController();

  if (loading) {
    return (
      <p className="text-sm text-base-content/60 text-center py-8">
        Carregando curso…
      </p>
    );
  }

  if (!curso) {
    return (
      <p className="text-sm text-base-content/60 text-center py-8">
        Curso não encontrado.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-6">
      <PageHeader
        title={curso.title}
        subtitle="Conteúdo de ensino e edificação"
        align="center"
      />

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
        {permissions.canEdit && (
          <Link
            to={`/cursos/${curso.id}/editar`}
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

        {curso.description && (
          <p className="text-sm text-base-content/70 text-center">
            {curso.description}
          </p>
        )}
      </section>

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

          {permissions.canEdit && (
            <Link
              to={`/cursos/${curso.id}/aulas/nova`}
              className="text-sm text-primary"
            >
              Nova aula
            </Link>
          )}
        </div>

        <AulaList courseId={curso.id} />
      </section>
    </div>
  );
}
