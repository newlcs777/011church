import { useEffect, useState } from "react";
import { getChapterVerses } from "../data/livros";

const STORAGE_KEY = "bible_reader_mode";

export default function BibleReader({
  bookName,
  chapter,
  focusVerse,
}) {
  const [verses, setVerses] = useState([]);
  const [nightMode, setNightMode] = useState(false);

  /* =========================
     CARREGAR MODO SALVO
  ========================= */
  useEffect(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (savedMode === "night") setNightMode(true);
  }, []);

  /* =========================
     SALVAR MODO
  ========================= */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      nightMode ? "night" : "light"
    );
  }, [nightMode]);

  /* =========================
     BUSCAR TEXTO
  ========================= */
  useEffect(() => {
    const data = getChapterVerses(bookName, chapter);
    setVerses(Array.isArray(data) ? data : []);
  }, [bookName, chapter]);

  /* =========================
     FOCO EM VERSÍCULO
  ========================= */
  useEffect(() => {
    if (!focusVerse || !verses.length) return;

    const el = document.getElementById(`verse-${focusVerse}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusVerse, verses]);

  if (!verses.length) {
    return (
      <p className="text-sm text-base-content/60 text-center mt-8">
        Nenhum versículo encontrado para este capítulo.
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* BOTÃO MODO (APENAS ÍCONE) */}
      <div className="flex justify-end mb-2 px-2 sm:px-0">
        <button
          type="button"
          aria-label="Alternar modo de leitura"
          onClick={() => setNightMode(v => !v)}
          className="
            p-2
            rounded-lg
            border
            border-base-300
            bg-transparent
            text-base-content/70
            hover:bg-base-200
            active:scale-[0.96]
            transition
          "
        >
          {nightMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* TEXTO BÍBLICO */}
      <div
        className={`
          w-full
          px-2
          py-4
          leading-relaxed
          space-y-6

          sm:max-w-3xl
          sm:mx-auto
          sm:px-6
          sm:py-6
          sm:rounded-xl

          ${
            nightMode
              ? "bg-[#111827] text-[#E5E7EB]"
              : "bg-transparent text-base-content"
          }
        `}
      >
        {verses.map(v => {
          const isFocused = v.verse === focusVerse;

          return (
            <p
              key={v.verse}
              id={`verse-${v.verse}`}
              className={`
                flex
                gap-3
                items-start
                scroll-mt-24
                ${
                  isFocused
                    ? "bg-primary/10 rounded-md px-2 py-1"
                    : ""
                }
              `}
            >
              {/* NÚMERO */}
              <span
                className={`
                  text-xs
                  min-w-[1.5rem]
                  text-right
                  pt-0.5
                  select-none
                  ${
                    nightMode
                      ? "text-[#6B7280]"
                      : "text-base-content/40"
                  }
                `}
              >
                {v.verse}
              </span>

              {/* TEXTO */}
              <span className="flex-1">
                {v.text}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
