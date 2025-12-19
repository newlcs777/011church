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
    <div className="min-h-screen flex bg-base-200 md:bg-transparent">

      {/* MENU MOBILE (overlay) */}
      {openMenu && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* OVERLAY ESCURO – AGORA NÃO BLOQUEIA QUANDO NÃO ATIVO */}
          <div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            onClick={() => setOpenMenu(false)}
          />

          {/* SIDEBAR MOBILE */}
          <aside
            className="
              relative
              z-50
              w-72
              h-full
              bg-secondary
              shadow-xl
              animate-slideIn
              overflow-y-auto
              scrollbar-thin
              scrollbar-thumb-base-300/30
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
          ring-base-300/70
        "
      >
        {/* SIDEBAR DESKTOP */}
        <aside
          className="
            hidden
            lg:block
            w-72
            border-r
            border-base-300/70
            bg-gradient-to-b
            from-secondary
            via-secondary
            to-neutral
            text-base-100
            overflow-y-auto
          "
        >
          <Sidebar />
        </aside>

        {/* CONTEÚDO */}
        <div className="flex flex-1 flex-col bg-base-100/90">
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
