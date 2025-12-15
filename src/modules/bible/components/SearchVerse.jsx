// src/modules/bible/components/SearchVerse.jsx
import { useState } from "react";
import Button from "../../../components/ui/Button";
import { livrosAT, livrosNT, capitulosPorLivro } from "../data/livros";

export default function SearchVerse({ onSelect }) {
  const [testament, setTestament] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");

  // Livros filtrados por testamento
  const booksByTestament =
    testament === "AT"
      ? livrosAT
      : testament === "NT"
      ? livrosNT
      : [];

  const chapters =
    book && capitulosPorLivro[book]
      ? Array.from(
          { length: capitulosPorLivro[book] },
          (_, i) => i + 1
        )
      : [];

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
      {/* TESTAMENTO */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-base-content/80">
          Testamento
        </label>

        <select
          value={testament}
          onChange={(e) => {
            setTestament(e.target.value);
            setBook("");
            setChapter("");
          }}
          className="
            select
            select-bordered
            w-full
          "
        >
          <option value="">Selecione o testamento</option>
          <option value="AT">Antigo Testamento</option>
          <option value="NT">Novo Testamento</option>
        </select>
      </div>

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
          disabled={!testament}
          className="
            select
            select-bordered
            w-full
            disabled:bg-base-200
            disabled:text-base-content/40
          "
        >
          <option value="">
            {testament
              ? "Selecione um livro"
              : "Escolha o testamento primeiro"}
          </option>

          {booksByTestament.map((b) => (
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
            {book ? "Selecione o capítulo" : "Escolha um livro primeiro"}
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
