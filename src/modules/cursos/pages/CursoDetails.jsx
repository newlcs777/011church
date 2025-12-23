import { useParams, Link } from "react-router-dom";
import { FaEdit, FaPlay } from "react-icons/fa";

import useCursos from "../hooks/useCursos";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import useAuth from "@/modules/auth/hooks/useAuth";

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
        Aula não encontrada.
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

      {/* CARD */}
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
        {/* ✏️ EDITAR */}
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
            aria-label="Editar aula"
          >
            <FaEdit size={14} />
          </Link>
        )}

        {/* DESCRIÇÃO */}
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

        {/* AÇÃO */}
        <div
          className="
            pt-2
            flex
            justify-center
          "
        >
          <Button
            as="a"
            href={normalizeUrl(curso.link)}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="
              w-full
              sm:w-auto
              inline-flex
              items-center
              justify-center
              gap-2
              active:scale-[0.98]
            "
          >
            <FaPlay className="text-xs" />
            Assistir aula
          </Button>
        </div>
      </section>
    </div>
  );
}

function normalizeUrl(url = "") {
  if (!url) return "#";
  return url.startsWith("http") ? url : `https://${url}`;
}
