export const QUICK_ACTIONS_BY_ROLE = {
  admin: [
    { label: "Criar Evento", to: "/eventos/create", icon: "📅" },
    { label: "Criar Escala", to: "/escalas/create", icon: "📝" },
    { label: "Comunicados", to: "/comunicados", icon: "📣" },
  ],

  pastor: [
    { label: "Criar Evento", to: "/eventos/create", icon: "📅" },
    { label: "Criar Escala", to: "/escalas/create", icon: "📝" },
    { label: "Comunicados", to: "/comunicados", icon: "📣" },
  ],

  lider: [
    { label: "Minha Escala", to: "/escalas", icon: "📝" },
    { label: "Comunicados", to: "/comunicados", icon: "📣" },
  ],

  obreiro: [
    { label: "Minha Escala", to: "/escalas", icon: "📝" },
    { label: "Eventos", to: "/eventos", icon: "📅" },
  ],

  membro: [
    { label: "Bíblia", to: "/bible", icon: "📖" },
    { label: "Eventos", to: "/eventos", icon: "📅" },
  ],
};

export function getQuickActions(role) {
  return QUICK_ACTIONS_BY_ROLE[role] || QUICK_ACTIONS_BY_ROLE.membro;
}
