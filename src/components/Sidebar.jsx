import { NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../modules/auth/hooks/useAuth";

const links = [
  { to: "/", label: "Início", icon: "🏠" },
  { to: "/bible", label: "Bíblia", icon: "📖" },
  { to: "/eventos", label: "Eventos", icon: "📅" },
  { to: "/comunicados", label: "Comunicados", icon: "📢" },
  { to: "/escalas", label: "Escalas", icon: "📝" },
];

// Ministérios
const ministryLinks = [
  { to: "/ministerios/presbiterio", label: "Presbitério" },
  { to: "/ministerios/louvor", label: "Louvor" },
  { to: "/ministerios/audio", label: "Áudio" },
  { to: "/ministerios/impacto", label: "Impacto" },
  { to: "/ministerios/intercessao", label: "Intercessão" },
  { to: "/ministerios/zelo", label: "Zelo" },
  { to: "/ministerios/guardiao", label: "Guardião" },
  { to: "/ministerios/boasvindas", label: "Boas-vindas" },
  { to: "/ministerios/kids", label: "Kids" },
  { to: "/ministerios/diaconia", label: "Diaconia" },
  { to: "/ministerios/base", label: "Base" },
];

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const [openMinistries, setOpenMinistries] = useState(false);

  const baseLinkClass = `
    group flex items-center gap-3 rounded-2xl px-3 py-2.5
    text-sm font-medium transition-all duration-200
  `;

  const activeClass = "bg-base-100/15 text-base-100 shadow-sm shadow-black/20";
  const inactiveClass = "text-base-100/80 hover:bg-base-100/5 hover:text-base-100";

  return (
    <aside
      className="
        flex flex-col h-full
        overflow-y-auto
        scrollbar-thin scrollbar-thumb-base-300/20 scrollbar-track-transparent
        px-1
      "
    >
      {/* HEADER */}
      <div className="border-b border-white/10 px-4 pb-4 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-100/60">
          011 Church
        </p>
        <p className="mt-1.5 text-sm font-medium text-base-100">
          Painel administrativo
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-1 space-y-1 px-3 pt-4">

        {/* Links padrão */}
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-100/10 text-lg">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* MENU DE MINISTÉRIOS */}
        <button
          onClick={() => setOpenMinistries(!openMinistries)}
          className={`${baseLinkClass} ${inactiveClass} w-full flex justify-between`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-100/10 text-lg">
              🙏
            </span>
            <span>Ministérios</span>
          </div>
          <span className="text-base-100/70">
            {openMinistries ? "▲" : "▼"}
          </span>
        </button>

        {/* SUBMENU MINISTÉRIOS */}
        {openMinistries && (
          <div
            className="
              ml-10 mt-1 flex flex-col gap-1 
              border-l border-white/10 pl-3
              animate-fadeIn
            "
          >
            {ministryLinks.map((sub) => (
              <NavLink
                key={sub.to}
                to={sub.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  text-sm py-1.5 rounded-lg transition 
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-base-100/70 hover:text-base-100"
                  }
                  `
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Admin */}
        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            onClick={onClose}
            className={({ isActive }) =>
              `${baseLinkClass} mt-3 ${isActive ? activeClass : inactiveClass}`
            }
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-100/10 text-lg">
              🛠️
            </span>
            <span>Admin</span>
          </NavLink>
        )}
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-white/10 px-4 py-4">
        <button
          type="button"
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          className="
            w-full rounded-2xl border border-base-100/20 bg-base-100/5 
            px-3 py-2 text-sm font-medium text-base-100 
            transition duration-200 hover:bg-base-100/10
          "
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
