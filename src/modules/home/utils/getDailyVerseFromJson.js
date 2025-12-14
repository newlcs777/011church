import bibleData from "../../bible/data/bible_almeida_rc_structured.json";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getDailyVerseFromJson() {
  const booksObj = bibleData?.books;

  if (!booksObj) {
    return {
      reference: "Erro ao carregar",
      text: "Estrutura da Bíblia inválida.",
    };
  }

  const bookIds = Object.keys(booksObj);
  const bookId = pickRandom(bookIds);

  const book = booksObj[bookId];
  const bookName = book?.name || `Livro ${bookId}`;

  const chaptersObj = book?.chapters;
  const chapterKeys = Object.keys(chaptersObj);
  const chapter = pickRandom(chapterKeys);

  const versesObj = chaptersObj[chapter];
  const verseKeys = Object.keys(versesObj);
  const verseNumber = pickRandom(verseKeys);

  const verseText = versesObj[verseNumber];

  return {
    reference: `${bookName} ${chapter}:${verseNumber}`,
    text: verseText,
  };
}
