import { Link } from "react-router-dom";

import ComunicadoCard from "../components/ComunicadoCard";
import ComunicadoCardSkeleton from "../components/ComunicadoCardSkeleton.jsx";

import useComunicados from "../hooks/useComunicados";
import useAuth from "../../auth/hooks/useAuth";
import { canCreateComunicado } from "../utils/comunicadoPermissions";

import PageHeader from "../../../components/ui/PageHeader";

export default function ComunicadosList() {
  const { user } = useAuth();
  const { comunicados = [], loading } = useComunicados();

  const canCreate = canCreateComunicado(user?.role);

  /* ORDENAÇÃO POR PROXIMIDADE DE DIAS */
  const sortedComunicados = [...comunicados].sort((a, b) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateA = new Date(a.data);
    const dateB = new Date(b.data);

    const diffA = Math.ceil(
      (dateA - today) / (1000 * 60 * 60 * 24)
    );
    const diffB = Math.ceil(
      (dateB - today) / (1000 * 60 * 60 * 24)
    );

    if (diffA < 0 && diffB >= 0) return 1;
    if (diffA >= 0 && diffB < 0) return -1;

    return diffA - diffB;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* CABEÇALHO */}
      <PageHeader
        title="Comunicados"
        subtitle="Mensagens e avisos para a edificação da igreja"
        align="center"
      />

      {/* AÇÃO DA LIDERANÇA */}
      {canCreate && (
        <div className="flex justify-end">
          <Link
            to="/comunicados/novo"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-medium
              tracking-wide
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              text-neutral/70
              hover:bg-base-200/70
              whitespace-nowrap
            "
          >
            + Novo comunicado
          </Link>
        </div>
      )}

      {/* LISTA */}
      <div className="flex flex-col gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <ComunicadoCardSkeleton key={i} />
          ))
        ) : sortedComunicados.length === 0 ? (
          <p className="text-sm text-base-content/60 text-center py-8">
            Ainda não há comunicados publicados.
          </p>
        ) : (
          sortedComunicados.map((comunicado) => (
            <ComunicadoCard
              key={comunicado.id}
              comunicado={comunicado}
            />
          ))
        )}
      </div>
    </div>
  );
}
