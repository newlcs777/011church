// src/modules/bible/services/bibleApi.js

const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;
const BASE_URL = "https://www.abibliadigital.com.br/api";
const VERSION = "nvi"; // NVI (API não possui NAA)

// ======================================
// Helpers
// ======================================
function normalize(str = "") {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("Erro API Bíblia:", res.status, res.statusText);
    throw new Error("Erro ao buscar na API da Bíblia");
  }

  return res.json();
}

// ======================================
// 1) Buscar todos os livros (com capítulos)
// ======================================
export async function getBooks() {
  const data = await apiFetch("/books");

  if (!Array.isArray(data)) return [];

  // filtra pela versão desejada
  return data.filter((book) => book.version === VERSION);
}

// ======================================
// 2) Buscar capítulo completo
// Retorna o objeto da API:
// { book, chapter, verses: [] }
// ======================================
export async function getChapter(abbrevPt, chapter) {
  if (!abbrevPt || !chapter) return null;

  const data = await apiFetch(`/verses/${VERSION}/${abbrevPt}/${chapter}`);

  return data ?? null;
}

// ======================================
// 3) Buscar versículo específico
// ======================================
export async function getVerse(abbrevPt, chapter, verse) {
  if (!abbrevPt || !chapter || !verse) return null;

  const data = await apiFetch(
    `/verses/${VERSION}/${abbrevPt}/${chapter}/${verse}`
  );

  const firstVerse =
    Array.isArray(data?.verses) && data.verses.length > 0
      ? data.verses[0]
      : null;

  return {
    book: data?.book?.name ?? "",
    chapter: data?.chapter?.number ?? chapter,
    verse: firstVerse?.number ?? verse,
    text: firstVerse?.text ?? "",
  };
}

// ======================================
// 4) Busca genérica por referência
// Ex: "Salmos 23", "Sl 23:1", "Jo 3:16"
// ======================================
export async function searchBible(reference, allBooks = []) {
  if (!reference || !Array.isArray(allBooks)) return null;

  const ref = reference.trim();

  // quebra em [livro, resto]
  const [rawBook, rawRest] = ref.split(/\s+/, 2);
  if (!rawBook || !rawRest) return null;

  const normBook = normalize(rawBook);

  // tenta achar o livro pelo nome ou abreviação
  const book = allBooks.find((b) => {
    const nameNorm = normalize(b.name);
    const abbrNorm = normalize(b.abbrev?.pt);
    return (
      nameNorm.startsWith(normBook) ||
      abbrNorm === normBook
    );
  });

  if (!book) {
    console.warn("Livro não encontrado:", reference);
    return null;
  }

  const abbrevPt = book.abbrev.pt;

  // Formato "23:1"
  if (rawRest.includes(":")) {
    const [ch, v] = rawRest.split(":");
    const chapter = parseInt(ch, 10);
    const verse = parseInt(v, 10);

    if (Number.isNaN(chapter) || Number.isNaN(verse)) return null;

    return getVerse(abbrevPt, chapter, verse);
  }

  // Formato "23" (capítulo inteiro)
  const chapter = parseInt(rawRest, 10);
  if (Number.isNaN(chapter)) return null;

  return getChapter(abbrevPt, chapter);
}
