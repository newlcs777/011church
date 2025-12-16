import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import SearchVerse from "../components/SearchVerse";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

export default function BiblePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialBook = searchParams.get("book") || "";
  const initialChapter = searchParams.get("chapter") || "";

  const [testament, setTestament] = useState("AT"); // AT | NT

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
                className="
                  text-base-content/60
                  hover:text-base-content
                "
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
          Escolha o testamento, o livro e o capítulo.
        </p>

        {/* SELETOR DE TESTAMENTO */}
        <div
          className="
            flex
            justify-center
            gap-2
          "
        >
          {/* SELETOR DE TESTAMENTO */}
<div
  className="
    flex
    justify-center
    gap-1
    bg-base-200/40
    p-1
    rounded-xl
    w-fit
    mx-auto
  "
>
  <Button
    variant="ghost"
    size="sm"
    onClick={() => setTestament("AT")}
    className={`
      rounded-lg
      px-4
      ${
        testament === "AT"
          ? "bg-base-100 shadow-sm text-base-content"
          : "text-base-content/60"
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
      rounded-lg
      px-4
      ${
        testament === "NT"
          ? "bg-base-100 shadow-sm text-base-content"
          : "text-base-content/60"
      }
    `}
  >
    Novo Testamento
  </Button>
</div>
        </div>

        {/* SELEÇÃO */}
        <div className="w-full max-w-sm mx-auto">
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
