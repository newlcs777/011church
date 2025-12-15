import { useLocation, useNavigate } from "react-router-dom";

import BibleReader from "../components/BibleReader";
import Button from "@/components/ui/Button";
import { capitulosPorLivro } from "../data/livros";

export default function BibleReadPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state?.book || !state?.chapter) {
    return (
      <div className="p-6">
        <Button onClick={() => navigate("/bible")}>
          Voltar
        </Button>
      </div>
    );
  }

  const { book, chapter } = state;
  const totalChapters = capitulosPorLivro[book] || 0;

  const hasPrev = chapter > 1;
  const hasNext = chapter < totalChapters;

  const goToChapter = (ch) => {
    navigate("/bible/read", {
      state: { book, chapter: ch },
    });
  };

  return (
    <div className="flex flex-col">

      {/* HEADER DE LEITURA (INDEPENDENTE) */}
      <div className="border-b bg-base-100">
        <div className="max-w-3xl mx-auto px-4 py-4 relative text-center">

          {/* VOLTAR */}
          <button
            onClick={() => navigate("/bible")}
            className="
              absolute
              right-4
              top-4
              text-sm
              text-base-content/60
              hover:text-base-content
              transition
            "
          >
            ← Voltar
          </button>

          {/* TÍTULO CENTRAL */}
          <h1 className="text-xl font-semibold tracking-wide">
            {book} {chapter}
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Modo leitura
          </p>
        </div>

        {/* CONTROLES */}
        <div className="max-w-3xl mx-auto px-4 pb-4 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToChapter(chapter - 1)}
            disabled={!hasPrev}
          >
            ← Anterior
          </Button>

          <select
            value={chapter}
            onChange={(e) =>
              goToChapter(Number(e.target.value))
            }
            className="
              select
              select-ghost
              select-sm
            "
          >
            {Array.from({ length: totalChapters }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Capítulo {i + 1}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToChapter(chapter + 1)}
            disabled={!hasNext}
          >
            Próximo →
          </Button>
        </div>
      </div>

      {/* TEXTO */}
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <BibleReader
            bookName={book}
            chapter={chapter}
          />
        </div>
      </div>

    </div>
  );
}
