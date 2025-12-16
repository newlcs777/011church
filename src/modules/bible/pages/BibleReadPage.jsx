import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useMemo } from "react";

import BibleReader from "../components/BibleReader";
import Button from "@/components/ui/Button";
import {
  capitulosPorLivro,
  livrosAT,
  livrosNT,
} from "../data/livros";

export default function BibleReadPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const bookDropdownRef = useRef(null);

  const [readingMode] = useState(true);
  const [openBooks, setOpenBooks] = useState(false);

  if (!state?.book || !state?.chapter) {
    return (
      <div className="p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/bible")}
        >
          ← Voltar
        </Button>
      </div>
    );
  }

  const { book, chapter, verse } = state;

  const totalChapters = capitulosPorLivro[book] || 0;
  const hasPrev = chapter > 1;
  const hasNext = chapter < totalChapters;

  /* =========================
     TESTAMENTO ATUAL
  ========================= */
  const isNT = useMemo(
    () => livrosNT.includes(book),
    [book]
  );

  const booksList = isNT ? livrosNT : livrosAT;

  /* =========================
     NAVEGAÇÕES
  ========================= */
  const goToChapter = (ch) => {
    navigate("/bible/read", {
      state: { book, chapter: ch },
    });
  };

  const goToBook = (newBook) => {
    setOpenBooks(false);
    navigate("/bible/read", {
      state: {
        book: newBook,
        chapter: 1,
      },
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

    if (
      Math.abs(deltaX) < MIN_SWIPE ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0 && hasNext) {
      goToChapter(chapter + 1);
    }

    if (deltaX > 0 && hasPrev) {
      goToChapter(chapter - 1);
    }
  };

  return (
    <div
      className="
        flex
        flex-col
        min-h-screen
      "
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* HEADER */}
      <div className="border-b bg-base-100">
        <div
          className="
            max-w-3xl
            mx-auto
            px-4
            py-4
            relative
            text-center
          "
        >
          {/* VOLTAR */}
          <button
            onClick={() => navigate("/bible")}
            className="
              absolute
              right-4
              top-4
              text-sm
              text-base-content/70
              hover:text-base-content
              transition
            "
          >
            ← Voltar
          </button>

          {/* DROPDOWN DE LIVRO (CUSTOM) */}
          <div
            ref={bookDropdownRef}
            className="relative inline-block"
          >
            <button
              onClick={() => setOpenBooks((v) => !v)}
              className="
                inline-flex
                items-center
                gap-1
                text-xl
                font-semibold
                tracking-wide
                text-base-content
                hover:underline
              "
            >
              {book}
              <span className="text-base-content/60">▾</span>
            </button>

            {openBooks && (
              <div
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  mt-2
                  w-56
                  max-h-72
                  overflow-auto
                  rounded-xl
                  border
                  border-base-300
                  bg-base-100
                  shadow-lg
                  z-50
                "
              >
                {booksList.map((b) => (
                  <button
                    key={b}
                    onClick={() => goToBook(b)}
                    className={`
                      w-full
                      text-left
                      px-4
                      py-2
                      text-sm
                      transition
                      ${
                        b === book
                          ? "bg-base-200 font-medium"
                          : "hover:bg-base-200"
                      }
                    `}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CAPÍTULO */}
          <p className="text-sm text-base-content/70 mt-0.5">
            Capítulo {chapter}
          </p>
        </div>

        {/* CONTROLES DE CAPÍTULO */}
        <div
          className="
            max-w-3xl
            mx-auto
            px-4
            pb-3
            grid
            grid-cols-3
            items-center
            gap-2
          "
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToChapter(chapter - 1)}
            disabled={!hasPrev}
            className="
              justify-start
              text-base-content/80
              truncate
            "
          >
            ← Capítulo {chapter - 1}
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
              text-base-content/90
              mx-auto
            "
          >
            {Array.from({ length: totalChapters }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Capítulo {i + 1}
              </option>
            ))}
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToChapter(chapter + 1)}
            disabled={!hasNext}
            className="
              justify-end
              text-base-content/80
              truncate
            "
          >
            Capítulo {chapter + 1} →
          </Button>
        </div>
      </div>

      {/* TEXTO */}
      <div
        className="
          px-4
          py-5
          sm:py-8
          flex-1
        "
      >
        <div className="max-w-3xl mx-auto">
          <BibleReader
            bookName={book}
            chapter={chapter}
            focusVerse={verse}
            readingMode={readingMode}
          />
        </div>
      </div>
    </div>
  );
}
