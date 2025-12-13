import { useEffect, useState } from "react";
import { getDailyVerse } from "../services/verseApi";
import VerseCard from "../components/VerseCard";
import NextEventCard from "../components/NextEventCard";
import QuickActions from "../components/QuickActions";
import useAuth from "../../auth/hooks/useAuth";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";

export default function HomePage() {
  const { user } = useAuth();
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    async function loadVerse() {
      const v = await getDailyVerse();
      setVerse(v);
    }
    loadVerse();
  }, []);

  const firstName = user?.nome ? user.nome.split(" ")[0] : "Convidado";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Olá, ${firstName}! 👋`}
        subtitle="Aqui você acompanha rapidamente o que está acontecendo na 011 Church."
      />

      {verse && (
        <Card
          title={verse.reference}
          subtitle="Versículo do dia"
          className="bg-gradient-to-r from-primary to-secondary text-primary-content"
        >
          <p className="text-sm md:text-base leading-relaxed">
            {verse.text}
          </p>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <NextEventCard />
        <QuickActions />
      </div>
    </div>
  );
}
