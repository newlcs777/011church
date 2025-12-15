import VerseCard from "../components/VerseCard";
import VerseSkeleton from "../components/VerseSkeleton";
import NextEventCard from "../components/NextEventCard";
import QuickActions from "../components/QuickActions";
import RoleSummaryCard from "../components/RoleSummaryCard";

import useHomeData from "../components/hooks/useHomeData";
import useAuth from "../../auth/hooks/useAuth";

import PageHeader from "../../../components/ui/PageHeader";

export default function HomePage() {
  const { user } = useAuth();
  const { verse, loading, permissions, quickActions } = useHomeData();

  const firstName = user?.nome
    ? user.nome.split(" ")[0]
    : "Convidado";

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        pb-6
      "
    >
      {/* HEADER */}
      <PageHeader
        title={`Olá, ${firstName}!`}
        subtitle="Que bom ter você aqui. Que este seja um tempo de edificação."
      />

      {/* RESUMO (liderança / admin) */}
      {permissions?.showSummary && (
        <RoleSummaryCard />
      )}

      {/* ESTUDO DO DIA (CAPÍTULO) */}
      <section className="flex flex-col gap-2">
        {loading && <VerseSkeleton />}

        {!loading && verse && (
          <VerseCard verse={verse} />
        )}
      </section>

      {/* PRÓXIMO CULTO + AÇÕES */}
      <section
        className="
          flex
          flex-col
          gap-4
          pt-2
        "
      >
        {permissions?.showNextEvent && <NextEventCard />}

        {permissions?.showQuickActions && (
          <QuickActions actions={quickActions} />
        )}
      </section>

      {/* FUTURO: comunicados / eventos */}
    </div>
  );
}
