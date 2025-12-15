import bibleData from "../../bible/data/bible_almeida_rc_structured.json";
import { getChapterVerses } from "../../bible/data/livros";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getDailyVerse() {
  const booksObj = bibleData?.books;
  if (!booksObj) {
    return {
      reference: "Erro",
      text: "Bíblia inválida",
    };
  }

  // escolhe livro
  const book = pickRandom(Object.values(booksObj));
  const bookName = book.name;

  // escolhe capítulo
  const chapterKey = pickRandom(Object.keys(book.chapters));
  const chapter = Number(chapterKey);

  // 🔹 LÊ PELO MESMO MÉTODO DO READER
  const verses = getChapterVerses(bookName, chapter);
  if (!verses.length) {
    return {
      reference: "Erro",
      text: "Capítulo vazio",
    };
  }

  const verseObj = pickRandom(verses);

  return {
    reference: `${bookName} ${chapter}:$`,
   
    book: bookName,
    chapter,
    verse: verseObj.verse,
  };
}
