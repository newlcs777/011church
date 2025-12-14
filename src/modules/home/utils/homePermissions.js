export const HOME_BY_ROLE = {
  admin: {
    showSummary: false,
    showQuickActions: true,
    showNextEvent: true,
    quickActions: [
      { label: "Bíblia", to: "/bible", icon: "📖" },
      { label: "Comunicados", to: "/comunicados", icon: "📢" },
      { label: "Eventos", to: "/eventos", icon: "📅" },
    ],
  },

  pastor: {
    showSummary: false,
    showQuickActions: true,
    showNextEvent: true,
    quickActions: [
      { label: "Bíblia", to: "/bible", icon: "📖" },
      { label: "Comunicados", to: "/comunicados", icon: "📢" },
      { label: "Eventos", to: "/eventos", icon: "📅" },
    ],
  },

  lider: {
    showSummary: false,
    showQuickActions: true,
    showNextEvent: true,
    quickActions: [
      { label: "Bíblia", to: "/bible", icon: "📖" },
      { label: "Comunicados", to: "/comunicados", icon: "📢" },
      { label: "Eventos", to: "/eventos", icon: "📅" },
    ],
  },

  obreiro: {
    showSummary: false,
    showQuickActions: true,
    showNextEvent: true,
    quickActions: [
      { label: "Bíblia", to: "/bible", icon: "📖" },
      { label: "Comunicados", to: "/comunicados", icon: "📢" },
      { label: "Eventos", to: "/eventos", icon: "📅" },
    ],
  },

  membro: {
    showSummary: false,
    showQuickActions: true,
    showNextEvent: true,
    quickActions: [
      { label: "Bíblia", to: "/bible", icon: "📖" },
      { label: "Comunicados", to: "/comunicados", icon: "📢" },
      { label: "Eventos", to: "/eventos", icon: "📅" },
    ],
  },
};

export function getHomePermissions(role) {
  return HOME_BY_ROLE[role] ?? HOME_BY_ROLE.membro;
}

export function getQuickActions(role) {
  return getHomePermissions(role).quickActions || [];
}
