import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout({ children }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  // 🔒 GARANTE que o menu mobile fecha ao trocar de rota
  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname]);

  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-[#020617]">

      {/* MENU MOBILE */}
      {openMenu && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenMenu(false)}
          />

          {/* SIDEBAR MOBILE — IGUAL LOGIN */}
          <aside
            className="
              relative
              z-50
              w-72
              h-full
              bg-[#020617]
              text-white
              shadow-xl
              animate-slideIn
              overflow-y-auto
              scrollbar-thin
              scrollbar-thumb-white/10
              scrollbar-track-transparent
            "
          >
            <Sidebar onClose={() => setOpenMenu(false)} />
          </aside>
        </div>
      )}

      {/* WRAPPER GERAL */}
      <div
        className="
          flex
          w-full
          max-w-6xl
          mx-auto
          overflow-hidden
          rounded-none
          md:rounded-3xl
          bg-base-100
          shadow-xl
          ring-1
          ring-black/10
        "
      >
        {/* SIDEBAR DESKTOP — IGUAL LOGIN */}
        <aside
          className="
            hidden
            lg:block
            w-72
            bg-[#020617]
            text-white
            border-r
            border-white/10
            overflow-y-auto
          "
        >
          <Sidebar />
        </aside>

        {/* CONTEÚDO */}
        <div className="flex flex-1 flex-col bg-base-100">
          <Header onOpenMenu={() => setOpenMenu(true)} />

          <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
            <div className="mx-auto w-full max-w-4xl flex flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
