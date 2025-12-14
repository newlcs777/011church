import Card from "@/components/ui/Card";

export default function RoleSummaryCard({ role }) {
  if (!role) return null;

  const ROLE_LABELS = {
    admin: "Administrador",
    pastor: "Pastor",
    lider: "Líder",
    obreiro: "Obreiro",
    membro: "Membro",
  };

  const ROLE_DESCRIPTIONS = {
    admin: "Acesso total ao sistema e aos ministérios.",
    pastor: "Visão geral da igreja e liderança dos ministérios.",
    lider: "Gestão e acompanhamento do seu ministério.",
    obreiro: "Acesso às escalas e participação nos ministérios.",
    membro: "Acompanhamento de eventos, comunicados e escalas.",
  };

  return (
    <Card
      title="Seu papel na igreja"
      subtitle={ROLE_LABELS[role] || "Membro"}
    >
      <p className="text-sm text-base-content/80">
        {ROLE_DESCRIPTIONS[role] ||
          "Acompanhe as atividades disponíveis para você."}
      </p>
    </Card>
  );
}
