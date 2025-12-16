import bibleData from "../../bible/data/bible_almeida_rc_structured.json";
import { getChapterVerses } from "../../bible/data/livros";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getDailyVerse() {
  const booksObj = bibleData?.books;
  if (!booksObj) return null;

  const book = pickRandom(Object.values(booksObj));
  const bookName = book.name;

  const chapterKey = pickRandom(Object.keys(book.chapters));
  const chapter = Number(chapterKey);

  // 🔹 só para PREVIEW
  const verses = getChapterVerses(bookName, chapter);
  if (!verses.length) return null;

  const verseObj = pickRandom(verses);

  return {
    reference: `${bookName} ${chapter}:${verseObj.verse}`,
    previewText: verseObj.text, // 👈 TEXTO PARA HOME
    book: bookName,
    chapter,
  };
}
