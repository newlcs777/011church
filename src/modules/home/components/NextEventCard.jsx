import Card from "../../../components/ui/Card";

export default function NextEventCard() {
  return (
    <Card
      title="Próximo culto"
      subtitle="Fique atento aos horários da igreja"
    >
      <div className="space-y-1 text-sm md:text-base">
        <p className="font-medium text-neutral">
          Domingo, 18h
        </p>
        <p className="text-neutral/80">
          011 Church • Santo Amaro
        </p>
      </div>
    </Card>
  );
}
