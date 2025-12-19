import { NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../modules/auth/hooks/useAuth";

import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineMegaphone,
  HiOutlineBeaker,
  HiOutlineClipboardDocumentList,
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

import {
  FaSpotify,
  FaInstagram,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

const links = [
  { to: "/", label: "Início", icon: HiOutlineHome },
  { to: "/bible", label: "Bíblia", icon: HiOutlineBookOpen },
  { to: "/eventos", label: "Eventos", icon: HiOutlineCalendarDays },
  { to: "/comunicados", label: "Comunicados", icon: HiOutlineMegaphone },
  { to: "/dna", label: "DNA", icon: HiOutlineBeaker },
  { to: "/escalas", label: "Escalas", icon: HiOutlineClipboardDocumentList },
];

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
  const [openCourses, setOpenCourses] = useState(false);

  const canSeeMinistries =
    ["admin", "pastor", "lider", "obreiro"].includes(user?.role);

  const canSeeCourses =
    ["admin", "pastor", "lider"].includes(user?.role);

  const baseLinkClass = `
    group flex items-center gap-3 rounded-2xl px-3 py-2.5
    text-sm font-medium transition-all duration-200
  `;

  const activeClass =
    "bg-base-100/15 text-base-100 shadow-sm shadow-black/20";
  const inactiveClass =
    "text-base-100/80 hover:bg-base-100/5 hover:text-base-100";

  return (
    <aside className="flex flex-col h-full overflow-y-auto px-1">
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
        {/* LINKS PRINCIPAIS */}
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-100/10">
              <Icon className="text-lg" />
            </span>
            <span>{label}</span>
          </NavLink>
        ))}

        {/* CURSOS */}
        {canSeeCourses && (
          <>
            <button
              onClick={() => setOpenCourses(!openCourses)}
              className={`${baseLinkClass} ${inactiveClass} w-full flex justify-between`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-100/10">
                  <HiOutlineAcademicCap className="text-lg" />
                </span>
                <span>Curso</span>
              </div>
              <span>{openCourses ? "▲" : "▼"}</span>
            </button>

            {openCourses && (
              <div className="ml-10 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                <NavLink to="/cursos" className="text-sm py-1.5 text-base-100/70 hover:text-base-100">
                  Ver cursos
                </NavLink>

                {canSeeCourses && (
                  <NavLink to="/cursos/novo" className="text-sm py-1.5 text-base-100/70 hover:text-base-100">
                    Criar curso
                  </NavLink>
                )}
              </div>
            )}
          </>
        )}

        {/* MINISTÉRIOS */}
        {canSeeMinistries && (
          <>
            <button
              onClick={() => setOpenMinistries(!openMinistries)}
              className={`${baseLinkClass} ${inactiveClass} w-full flex justify-between`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-100/10">
                  <HiOutlineUsers className="text-lg" />
                </span>
                <span>Ministérios</span>
              </div>
              <span>{openMinistries ? "▲" : "▼"}</span>
            </button>

            {openMinistries && (
              <div className="ml-10 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                {ministryLinks.map((m) => (
                  <NavLink
                    key={m.to}
                    to={m.to}
                    className="text-sm py-1.5 text-base-100/70 hover:text-base-100"
                  >
                    {m.label}
                  </NavLink>
                ))}
              </div>
            )}
          </>
        )}

        {/* LINKS EXTERNOS */}
        <div className="mt-6 border-t border-white/10 pt-4 space-y-1">
          <a href="https://open.spotify.com" target="_blank" className={`${baseLinkClass} ${inactiveClass}`}>
            <FaSpotify />
            <span>Spotify</span>
          </a>

          <a href="https://instagram.com" target="_blank" className={`${baseLinkClass} ${inactiveClass}`}>
            <FaInstagram />
            <span>Instagram</span>
          </a>

          <a href="https://youtube.com" target="_blank" className={`${baseLinkClass} ${inactiveClass}`}>
            <FaYoutube />
            <span>YouTube</span>
          </a>

          <a href="#" className={`${baseLinkClass} ${inactiveClass}`}>
            <FaHeart />
            <span>Doações</span>
          </a>
        </div>
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-white/10 px-4 py-4">
        <button
          onClick={() => {
            logout();
            onClose?.();
          }}
          className="w-full rounded-2xl border border-base-100/20 bg-base-100/5 px-3 py-2 text-sm hover:bg-base-100/10"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
