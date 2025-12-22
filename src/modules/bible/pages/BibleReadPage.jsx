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

  const [openBooks, setOpenBooks] = useState(false);

  // fallback defensivo
  if (!state?.book || !state?.chapter) {
    navigate("/bible");
    return null;
  }

  const { book, chapter, verse } = state;

  const totalChapters = capitulosPorLivro[book] || 0;
  const hasPrev = chapter > 1;
  const hasNext = chapter < totalChapters;

  const isNT = useMemo(() => livrosNT.includes(book), [book]);
  const booksList = isNT ? livrosNT : livrosAT;

  const goToChapter = (ch) => {
    navigate("/bible/read", {
      state: { book, chapter: ch },
    });
  };

  const goToBook = (newBook) => {
    setOpenBooks(false);
    navigate("/bible/read", {
      state: { book: newBook, chapter: 1 },
    });
  };

  /* =========================
     SWIPE
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

    if (
      Math.abs(deltaX) < 60 ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0 && hasNext) goToChapter(chapter + 1);
    if (deltaX > 0 && hasPrev) goToChapter(chapter - 1);
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* HEADER DE LEITURA */}
      <div className="border-b border-base-200 bg-base-100">
        <div className="px-4 pt-3 pb-2 text-center">
          {/* LIVRO */}
          <div ref={bookDropdownRef} className="relative inline-block">
            <button
              onClick={() => setOpenBooks((v) => !v)}
              className="
                inline-flex
                items-center
                gap-1
                text-base
                font-semibold
                text-base-content
              "
            >
              {book}
              <span className="text-base-content/50">▾</span>
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
                      px-4
                      py-2
                      text-sm
                      text-left
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
          <p className="mt-0.5 text-xs text-base-content/50">
            Capítulo {chapter}
          </p>

          {/* CONTROLES */}
          <div className="mt-2 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={!hasPrev}
              onClick={() => goToChapter(chapter - 1)}
              className="px-2"
            >
              ←
            </Button>

            <select
              value={chapter}
              onChange={(e) =>
                goToChapter(Number(e.target.value))
              }
              className="
                select
                select-ghost
                select-xs
                text-base-content/70
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
              disabled={!hasNext}
              onClick={() => goToChapter(chapter + 1)}
              className="px-2"
            >
              →
            </Button>
          </div>
        </div>
      </div>

      {/* TEXTO BÍBLICO — NÃO INTERFERIR NO FUNDO */}
      <div className="flex-1 pt-2 pb-12">
        <div
          className="
            w-full
            sm:max-w-3xl
            sm:mx-auto
          "
        >
          <BibleReader
            bookName={book}
            chapter={chapter}
            focusVerse={verse}
            readingMode
          />
        </div>
      </div>
    </div>
  );
}
