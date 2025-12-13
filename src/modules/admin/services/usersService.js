
let usuarios = [
  { id: 1, nome: "Admin Master", email: "admin@teste.com", role: "admin" },
  { id: 2, nome: "Pastor Geral", email: "pastor@teste.com", role: "pastor" },
  { id: 3, nome: "Líder João", email: "lider@teste.com", role: "lider" },
  { id: 4, nome: "Obreiro Carlos", email: "obreiro@teste.com", role: "obreiro" },
  { id: 5, nome: "Membro Ana", email: "ana@teste.com", role: "membro" },
];

export function getUsuarios() {
  return usuarios;
}

export function updateUserRole(id, role) {
  usuarios = usuarios.map((u) => (u.id === id ? { ...u, role } : u));
}
