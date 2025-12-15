import { useNavigate, Link, useSearchParams } from "react-router-dom";

import SearchVerse from "../components/SearchVerse";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

export default function BiblePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialBook = searchParams.get("book") || "";
  const initialChapter = searchParams.get("chapter") || "";

  /* ========================
     BUSCA → LEITURA
  ========================= */
  const handleSearch = ({ book, chapter }) => {
    if (!book || !chapter) return;

    navigate("/bible/read", {
      state: {
        book,
        chapter,
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="
          w-full
          max-w-3xl
          mx-auto
          px-4
          flex
          flex-col
          gap-8
        "
      >
        {/* HEADER */}
        <div className="relative flex items-center justify-center">
          <div className="absolute right-0">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-base-content/60 hover:text-base-content"
              >
                ← Voltar
              </Button>
            </Link>
          </div>

          <PageHeader
            title="Bíblia Sagrada"
            className="text-center"
          />
        </div>

        {/* TEXTO INTRODUTÓRIO */}
        <p
          className="
            text-sm
            text-base-content/70
            text-center
            max-w-md
            mx-auto
            leading-relaxed
          "
        >
          Separe um momento para a leitura da Palavra.
          Escolha o livro e o capítulo que deseja ler e siga para o modo de leitura.
        </p>

        {/* SELEÇÃO */}
        <div className="w-full max-w-sm mx-auto">
          <SearchVerse
            onSelect={handleSearch}
            initialBook={initialBook}
            initialChapter={initialChapter}
          />
        </div>
      </div>
    </div>
  );
}
