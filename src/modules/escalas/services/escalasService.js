
let ministerios = [
  {
    id: 1,
    nome: "Louvor",
    lider: "João Martins",
    membros: ["João Martins", "Ana Paula", "Lucas Cardoso"],
    escala: [
      { data: "2025-02-10", responsavel: "Ana Paula" },
      { data: "2025-02-17", responsavel: "Lucas Cardoso" },
    ],
  },
  {
    id: 2,
    nome: "Recepção",
    lider: "Maria Eduarda",
    membros: ["Maria Eduarda", "Felipe Santos", "Mariana Dias"],
    escala: [
      { data: "2025-02-10", responsavel: "Felipe Santos" },
      { data: "2025-02-17", responsavel: "Mariana Dias" },
    ],
  },
];

export function getMinisterios() {
  return ministerios;
}

export function getMinisterio(id) {
  return ministerios.find((m) => m.id === Number(id));
}
