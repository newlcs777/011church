import Card from "../../../components/ui/Card";

export default function VerseCard({ verse }) {
  if (!verse) return null;

  return (
    <Card
      title={verse.reference}
      subtitle="Versículo do dia"
      className="
        bg-gradient-to-r
        from-primary
        to-secondary
        text-primary-content
      "
    >
      <p className="text-sm md:text-base leading-relaxed">{verse.text}</p>
    </Card>
  );
}
