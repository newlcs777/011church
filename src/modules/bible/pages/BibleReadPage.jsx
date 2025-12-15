import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

import BibleReader from "../components/BibleReader";
import Button from "@/components/ui/Button";
import { capitulosPorLivro } from "../data/livros";

export default function BibleReadPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  if (!state?.book || !state?.chapter) {
    return (
      <div className="p-6">
        <Button onClick={() => navigate("/bible")}>
          Voltar
        </Button>
      </div>
    );
  }

  const { book, chapter, verse } = state;
  const totalChapters = capitulosPorLivro[book] || 0;

  const hasPrev = chapter > 1;
  const hasNext = chapter < totalChapters;

  const goToChapter = (ch) => {
    navigate("/bible/read", {
      state: { book, chapter: ch },
    });
  };

  /* =========================
     SWIPE HANDLERS
  ========================= */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX =
      e.changedTouches[0].clientX - touchStartX.current;
    const deltaY =
      e.changedTouches[0].clientY - touchStartY.current;

    const MIN_SWIPE = 60;

    // Evita conflito com scroll vertical
    if (
      Math.abs(deltaX) < MIN_SWIPE ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    // 👉 direita → PRÓXIMO capítulo
    if (deltaX > 0 && hasNext) {
      goToChapter(chapter + 1);
    }

    // 👈 esquerda → ANTERIOR capítulo
    if (deltaX < 0 && hasPrev) {
      goToChapter(chapter - 1);
    }
  };

  return (
    <div
      className="
        flex
        flex-col
        min-h-screen
        transition-colors
        bg-[#020617]
      "
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* HEADER DE LEITURA */}
      <div className="border-b border-[#020617] bg-[#020617]">
        <div className="max-w-3xl mx-auto px-4 py-4 relative text-center">
          {/* VOLTAR */}
          <button
            onClick={() => navigate("/bible")}
            className="
              absolute
              right-4
              top-4
              text-sm
              text-[#94A3B8]
              hover:text-white
              transition
            "
          >
            ← Voltar
          </button>

          {/* TÍTULO */}
          <h1 className="text-xl font-semibold tracking-wide text-[#E5E7EB]">
            {book} {chapter}
          </h1>

          <p className="text-sm text-[#94A3B8] mt-1">
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
            className="
              border-[#1E293B]
              text-[#CBD5E1]
              hover:bg-[#020617]/80
            "
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
              text-[#CBD5E1]
              bg-transparent
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
            className="
              border-[#1E293B]
              text-[#CBD5E1]
              hover:bg-[#020617]/80
            "
          >
            Próximo →
          </Button>
        </div>
      </div>

      {/* TEXTO */}
      <div className="px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <BibleReader
            bookName={book}
            chapter={chapter}
            focusVerse={verse}
          />
        </div>
      </div>
    </div>
  );
}
