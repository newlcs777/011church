import { useState } from "react";

import PageHeader from "@/components/ui/PageHeader";
import PersonCardSkeleton from "../components/PersonCardSkeleton";

export default function PeopleByDnaPage() {
  // 🔹 loading temporário até ligar o hook real
  const [loading] = useState(true);

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        pb-6
      "
    >
      <PageHeader
        title="Pessoas do meu DNA"
        subtitle="Membros e visitantes vinculados ao seu grupo de DNA."
      />

      {/* CARD BASE */}
      <section
        className="
          bg-base-100
          rounded-2xl
          border
          border-base-300
          p-4
          sm:p-6
          flex
          flex-col
          gap-4
        "
      >
        {loading ? (
          <>
            <PersonCardSkeleton />
            <PersonCardSkeleton />
            <PersonCardSkeleton />
          </>
        ) : (
          <p className="text-sm text-base-content/60">
            Nenhuma pessoa vinculada a este DNA no momento.
          </p>
        )}

        {/*
          🔹 Futuro:
          pessoas.map(person => <PersonCard />)
        */}
      </section>
    </div>
  );
}
