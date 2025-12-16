// src/modules/bible/components/SearchVerse.jsx
import { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import { livrosAT, livrosNT, capitulosPorLivro } from "../data/livros";

export default function SearchVerse({ onSelect, testament }) {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");

  const books =
    testament === "NT"
      ? livrosNT
      : livrosAT;

  const chapters =
    book && capitulosPorLivro[book]
      ? Array.from(
          { length: capitulosPorLivro[book] },
          (_, i) => i + 1
        )
      : [];

  // Quando troca o testamento, reseta seleção
  useEffect(() => {
    setBook("");
    setChapter("");
  }, [testament]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book || !chapter) return;

    onSelect({
      book,
      chapter: Number(chapter),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-5
        max-w-md
        mx-auto
      "
    >
      {/* LIVRO */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-base-content/80">
          Livro bíblico
        </label>

        <select
          value={book}
          onChange={(e) => {
            setBook(e.target.value);
            setChapter("");
          }}
          className="
            select
            select-bordered
            w-full
          "
        >
          <option value="">
            Selecione um livro
          </option>

          {books.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* CAPÍTULO */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-base-content/80">
          Capítulo
        </label>

        <select
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          disabled={!book}
          className="
            select
            select-bordered
            w-full
            disabled:bg-base-200
            disabled:text-base-content/40
          "
        >
          <option value="">
            {book
              ? "Selecione o capítulo"
              : "Escolha um livro primeiro"}
          </option>

          {chapters.map((c) => (
            <option key={c} value={c}>
              Capítulo {c}
            </option>
          ))}
        </select>
      </div>

      {/* AÇÃO */}
      <div className="pt-3 flex justify-center">
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={!book || !chapter}
          className="whitespace-nowrap"
        >
          Ler capítulo
        </Button>
      </div>
    </form>
  );
}
