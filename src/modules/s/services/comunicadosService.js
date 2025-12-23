
let comunicados = [
  {
    id: 1,
    titulo: "Reunião de Líderes",
    mensagem: "Reunião geral de líderes nesta quarta às 20h.",
    data: "2025-02-15",
  },
];

export function getComunicados() {
  return comunicados;
}

export function getComunicado(id) {
  return comunicados.find((c) => c.id === Number(id));
}

export function createComunicado(data) {
  data.id = Date.now();
  comunicados.push(data);
}

export function updateComunicado(updated) {
  comunicados = comunicados.map((c) => (c.id === updated.id ? updated : c));
}

export function deleteComunicado(id) {
  comunicados = comunicados.filter((c) => c.id !== Number(id));
}
