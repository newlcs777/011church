// src/modules/bible/services/bibleApi.js
const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;
const BASE_URL = "https://www.abibliadigital.com.br/api";
const VERSION = "nvi"; // aqui seria "naa" se a API tivesse NAA

function normalize(str) {
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

// 🔹 1) Buscar todos os livros (com capítulos)
export async function getBooks() {
  const data = await apiFetch("/books");
  // filtra pela versão que queremos
  return data.filter((book) => book.version === VERSION);
}

// 🔹 2) Buscar capítulo completo (lista de versículos)
export async function getChapter(abbrevPt, chapter) {
  const data = await apiFetch(`/verses/${VERSION}/${abbrevPt}/${chapter}`);
  // data.verses já vem como [{ number, text }, ...]
  return data;
}

// 🔹 3) Buscar versículo específico
export async function getVerse(abbrevPt, chapter, verse) {
  const data = await apiFetch(
    `/verses/${VERSION}/${abbrevPt}/${chapter}/${verse}`
  );

  // a API também devolve array "verses", pegamos o primeiro
  const first = Array.isArray(data.verses) ? data.verses[0] : null;

  return {
    book: data.book?.name,
    chapter: data.chapter?.number ?? chapter,
    verse: first?.number ?? verse,
    text: first?.text ?? "",
  };
}

// 🔹 4) Search genérica por referência (ex: "Salmos 23", "Sl 23:1", "João 3:16")
export async function searchBible(reference, allBooks) {
  if (!reference) return null;

  const ref = reference.trim();

  // quebra em [livro, resto]
  const [rawBook, rawRest] = ref.split(/\s+/, 2);
  if (!rawBook || !rawRest) return null;

  const normBook = normalize(rawBook);

  // tenta achar o livro pelo nome ou pela abreviação
  const book = allBooks.find((b) => {
    const nameNorm = normalize(b.name);
    const abbrNorm = normalize(b.abbrev.pt);
    return nameNorm.startsWith(normBook) || abbrNorm === normBook;
  });

  if (!book) {
    console.warn("Livro não encontrado para referência:", reference);
    return null;
  }

  const abbrevPt = book.abbrev.pt;

  // Formato "23:1" ou "3:16"
  if (rawRest.includes(":")) {
    const [ch, v] = rawRest.split(":");
    const chapter = parseInt(ch, 10);
    const verse = parseInt(v, 10);
    if (Number.isNaN(chapter) || Number.isNaN(verse)) return null;

    return getVerse(abbrevPt, chapter, verse);
  }

  // Formato "23" (só capítulo)
  const chapter = parseInt(rawRest, 10);
  if (Number.isNaN(chapter)) return null;

  return getChapter(abbrevPt, chapter);
}
