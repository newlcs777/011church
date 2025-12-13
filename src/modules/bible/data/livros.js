// src/modules/bible/data/livros.js
import bibleData from "./bible_almeida_rc_structured.json";

// Todos os livros
const books = bibleData.books;

// 39 primeiros = AT
export const livrosAT = books.slice(0, 39).map((b) => b.name);

// Demais = NT
export const livrosNT = books.slice(39).map((b) => b.name);

// Quantidade de capítulos por livro
export const capitulosPorLivro = books.reduce((acc, book) => {
  acc[book.name] = Object.keys(book.chapters).length;
  return acc;
}, {});

// Versículos de um capítulo
export function getChapterVerses(bookName, chapterNumber) {
  const book = books.find((b) => b.name === bookName);
  if (!book) return [];

  return book.chapters[String(chapterNumber)] || [];
}

// Versículo único
export function getSingleVerse(bookName, chapterNumber, verseNumber) {
  const verses = getChapterVerses(bookName, chapterNumber);
  return verses.find((v) => v.verse === verseNumber) || null;
}
