import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import SearchVerse from "../components/SearchVerse";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

export default function BiblePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialBook = searchParams.get("book") || "";
  const initialChapter = searchParams.get("chapter") || "";

  const [testament, setTestament] = useState("AT"); // AT | NT

  function handleSearch({ book, chapter }) {
    if (!book || !chapter) return;

    navigate("/bible/read", {
      state: { book, chapter },
    });
  }

  return (
    <div className="flex w-full justify-center">
      <div
        className="
          w-full
          max-w-md
          px-4
          pb-10
          flex
          flex-col
          gap-6
        "
      >
        {/* TÍTULO */}
        <PageHeader
          title="Bíblia Sagrada"
          subtitle="Separe um momento para a leitura da Palavra"
          align="center"
        />

        {/* TEXTO DE APOIO */}
        <p
          className="
            text-center
            text-sm
            text-base-content/70
            leading-relaxed
            px-2
          "
        >
          Escolha o testamento, o livro e o capítulo
          para iniciar a leitura.
        </p>

        {/* SELETOR DE TESTAMENTO */}
        <div className="flex justify-center">
  <div
    className="
      flex
      gap-1
      bg-base-200/40
      p-1
      rounded-xl
    "
  >
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTestament("AT")}
      className={`
        px-4
        rounded-lg
        transition-all
        bg-base-100
        ${
          testament === "AT"
            ? `
              shadow-md
              text-base-content
              font-semibold
              opacity-100
            `
            : `
              text-base-content/40
              opacity-70
              hover:opacity-90
            `
        }
      `}
    >
      Velho Testamento
    </Button>

    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTestament("NT")}
      className={`
        px-4
        rounded-lg
        transition-all
        bg-base-100
        ${
          testament === "NT"
            ? `
              shadow-md
              text-base-content
              font-semibold
              opacity-100
            `
            : `
              text-base-content/40
              opacity-70
              hover:opacity-90
            `
        }
      `}
    >
      Novo Testamento
    </Button>
  </div>
</div>


        {/* BUSCA */}
        <div className="pt-2">
          <SearchVerse
            testament={testament}
            onSelect={handleSearch}
            initialBook={initialBook}
            initialChapter={initialChapter}
          />
        </div>
      </div>
    </div>
  );
}
