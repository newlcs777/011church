
export async function getDailyVerse() {
  try {
    const res = await fetch("https://bible-api.com/john%203:16");
    const data = await res.json();
    return {
      reference: data.reference,
      text: data.text,
    };
  } catch (e) {
    return {
      reference: "Erro ao carregar",
      text: "Não foi possível obter o versículo.",
    };
  }
}
