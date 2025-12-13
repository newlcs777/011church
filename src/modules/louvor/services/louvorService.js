
let musicas = [
  {
    id: 1,
    titulo: "Nenhum Outro Nome",
    letra: "Nenhum outro nome é como o Teu...",
    ministro: "Ministério de Louvor 011",
    tom: "D",
  },
  {
    id: 2,
    titulo: "Porque Ele Vive",
    letra: "Deus enviou Seu Filho amado...",
    ministro: "Coral Jovem",
    tom: "G",
  },
];

export function getMusicas() {
  return musicas;
}

export function getMusica(id) {
  return musicas.find((m) => m.id === Number(id));
}
