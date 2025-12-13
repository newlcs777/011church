import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import SearchVerse from "../components/SearchVerse";
import VerseResult from "../components/VerseResult";
import { searchBible } from "../services/bibleApi";

import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import {
  livrosAT,
  livrosNT,
  capitulosPorLivro,
  getChapterVerses,
  getSingleVerse,
} from "../data/livros";

export default function BiblePage() {
  const [verseSearchResult, setVerseSearchResult] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [chapterVerses, setChapterVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [selectedVerseText, setSelectedVerseText] = useState("");

  const [loading, setLoading] = useState(false);

  const verseTopRef = useRef(null);
  const chaptersRef = useRef(null);
  const versesRef = useRef(null);

  /* ========================
     FUNÇÕES DE BUSCA
  ========================= */
  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await searchBible(query);
      setVerseSearchResult(result);
    } finally {
      setLoading(false);
    }
  };

  /* ========================
     SELEÇÃO DE LIVRO
  ========================= */
  const handleBookClick = (book) => {
    const defaultChapter = 1;

    setSelectedBook(book);
    setSelectedChapter(defaultChapter);
    setSelectedVerse(null);
    setSelectedVerseText("");

    const verses = getChapterVerses(book, defaultChapter);
    setChapterVerses(verses);

    setTimeout(() => {
      chaptersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  /* ========================
     SELEÇÃO DE CAPÍTULO
  ========================= */
  const handleChapterClick = (chapter) => {
    if (!selectedBook) return;

    setSelectedChapter(chapter);
    setSelectedVerse(null);
    setSelectedVerseText("");

    const verses = getChapterVerses(selectedBook, chapter);
    setChapterVerses(verses);

    setTimeout(() => {
      versesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  /* ========================
     SELEÇÃO DE VERSÍCULO
  ========================= */
  const handleVerseClick = (verseNum) => {
    setSelectedVerse(verseNum);

    const v = getSingleVerse(selectedBook, selectedChapter, verseNum);
    setSelectedVerseText(v ? v.text : "");

    setTimeout(() => {
      verseTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  /* ========================
     SETAS DE NAVEGAÇÃO ENTRE VERSÍCULOS
  ========================= */
  const nextVerse = () => {
    if (!chapterVerses.length || !selectedVerse) return;
    const maxVerse = chapterVerses.length;
    if (selectedVerse < maxVerse) {
      handleVerseClick(selectedVerse + 1);
    }
  };

  const prevVerse = () => {
    if (!chapterVerses.length || !selectedVerse) return;
    if (selectedVerse > 1) {
      handleVerseClick(selectedVerse - 1);
    }
  };

  /* ========================
     RENDER
  ========================= */
  return (
    <div className="flex flex-col w-full">
      {/* CONTAINER CENTRAL */}
      <div className="w-full max-w-4xl mx-auto px-3 md:px-0 flex flex-col gap-6">

        <PageHeader
          title="Bíblia"
          subtitle="Busque ou navegue por livros, capítulos e versículos."
          right={
            <Link to="/">
              <Button variant="outline" size="sm">← Voltar</Button>
            </Link>
          }
        />

        {/* BUSCA */}
        <Card title="Buscar passagem (texto)">
          <SearchVerse onSearch={handleSearch} loading={loading} />
        </Card>

        {/* RESULTADO DA BUSCA */}
        {verseSearchResult && (
          <Card title="Resultado da busca">
            <VerseResult data={verseSearchResult} />
          </Card>
        )}

        <div ref={verseTopRef} />

        {/* VERSÍCULO SELECIONADO */}
        {selectedVerse && (
          <Card>
            {/* SETAS DE NAVEGAÇÃO */}
            <div className="flex items-center justify-between mb-3 px-2">
              <button
                onClick={prevVerse}
                className="px-3 py-1 rounded-md bg-base-200 hover:bg-primary hover:text-primary-content transition"
              >
                ←
              </button>

              <p className="font-bold text-lg">
                {selectedBook} {selectedChapter}:{selectedVerse}
              </p>

              <button
                onClick={nextVerse}
                className="px-3 py-1 rounded-md bg-base-200 hover:bg-primary hover:text-primary-content transition"
              >
                →
              </button>
            </div>

            {/* TEXTO DO VERSÍCULO */}
            <div className="p-4 rounded-xl bg-base-200/70 border shadow-inner">
              <p className="leading-relaxed">{selectedVerseText}</p>
            </div>
          </Card>
        )}

        {/* LIVROS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Card title="Antigo Testamento">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {livrosAT.map((livro) => (
                <button
                  key={livro}
                  onClick={() => handleBookClick(livro)}
                  className={`
  px-3 
  py-1 
  text-sm 
  rounded-lg 
  border 
  font-medium 
  transition 
  break-words        /* quebra nomes grandes */
  whitespace-normal  /* permite quebra de linha */
  text-center        /* centraliza nome quando quebrar */

  ${
    selectedBook === livro
      ? "bg-primary text-primary-content shadow"
      : "bg-base-200 hover:bg-primary hover:text-primary-content"
  }
`}

                >
                  {livro}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Novo Testamento">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {livrosNT.map((livro) => (
                <button
                  key={livro}
                  onClick={() => handleBookClick(livro)}
                 className={`
  px-3 
  py-1 
  text-sm 
  rounded-lg 
  border 
  font-medium 
  transition 
  break-words        /* quebra nomes grandes */
  whitespace-normal  /* permite quebra de linha */
  text-center        /* centraliza nome quando quebrar */

  ${
    selectedBook === livro
      ? "bg-primary text-primary-content shadow"
      : "bg-base-200 hover:bg-primary hover:text-primary-content"
  }
`}

                >
                  {livro}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* CAPÍTULOS */}
        {selectedBook && (
          <Card title={`Capítulos de ${selectedBook}`}>
            <div className="w-full overflow-x-hidden">
              <div
                ref={chaptersRef}
                className="grid grid-cols-8 gap-2 w-full"
                style={{ maxWidth: "100%", display: "flex", flexWrap: "wrap" }}
              >
                {Array.from({
                  length: capitulosPorLivro[selectedBook] || 0,
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleChapterClick(i + 1)}
                    className={`
                      px-3 py-1 text-sm rounded-md border transition
                      ${
                        selectedChapter === i + 1
                          ? "bg-primary text-primary-content"
                          : "bg-base-200 hover:bg-primary hover:text-primary-content"
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* VERSÍCULOS */}
        {chapterVerses.length > 0 && (
          <Card title={`Versículos de ${selectedBook} ${selectedChapter}`}>
            <div className="w-full overflow-x-hidden">
              <div
                ref={versesRef}
                className="grid grid-cols-8 gap-2 w-full"
                style={{ maxWidth: "100%", display: "flex", flexWrap: "wrap" }}
              >
                {chapterVerses.map((item) => (
                  <button
                    key={item.verse}
                    onClick={() => handleVerseClick(item.verse)}
                    className={`
                      px-3 py-1 text-sm rounded-md border transition
                      ${
                        selectedVerse === item.verse
                          ? "bg-primary text-primary-content"
                          : "bg-base-200 hover:bg-primary hover:text-primary-content"
                      }
                    `}
                  >
                    {item.verse}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
