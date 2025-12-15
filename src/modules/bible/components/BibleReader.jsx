import { useEffect, useState } from "react";
import { getChapterVerses } from "../data/livros";

const STORAGE_KEY = "bible_reader_mode";

export default function BibleReader({
  bookName,
  chapter,
  focusVerse, // 🔹 versículo que veio do Home
}) {
  const [verses, setVerses] = useState([]);
  const [nightMode, setNightMode] = useState(false);

  /* =========================
     CARREGAR MODO SALVO
  ========================= */
  useEffect(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (savedMode === "night") {
      setNightMode(true);
    }
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
     IR ATÉ O VERSÍCULO
  ========================= */
  useEffect(() => {
    if (!focusVerse || !verses.length) return;

    const el = document.getElementById(
      `verse-${focusVerse}`
    );

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
    <div className="w-full max-w-3xl mx-auto px-1 md:px-0">
      {/* CONTROLE DE LEITURA */}
      <div className="flex justify-end mb-3">
        <button
          type="button"
          onClick={() => setNightMode((v) => !v)}
          className={`
            text-xs
            px-3
            py-1
            rounded-md
            border
            transition
            ${
              nightMode
                ? "border-[#D1D5DB] text-[#4B5563] bg-[#F3F4F6] hover:bg-[#E5E7EB]"
                : "border-base-300 text-base-content/70 hover:bg-base-200"
            }
          `}
        >
          {nightMode ? "☀️ Modo claro" : "🌙 Modo leitura"}
        </button>
      </div>

      {/* TEXTO BÍBLICO */}
      <div
        className={`
          rounded-xl
          px-4
          py-6
          leading-relaxed
          space-y-6
          transition-colors
          ${
            nightMode
              ? "bg-[#F4F5F7] text-[#1F2937]"
              : "bg-transparent text-base-content"
          }
        `}
      >
        {verses.map((v) => {
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
              {/* Nº DO VERSÍCULO */}
              <span
                className={`
                  text-xs
                  min-w-[1.5rem]
                  text-right
                  pt-0.5
                  select-none
                  ${
                    nightMode
                      ? "text-[#9CA3AF]"
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
