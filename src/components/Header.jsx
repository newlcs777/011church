import useAuth from "../modules/auth/hooks/useAuth";

export default function Header({ onOpenMenu }) {
  const { user } = useAuth();
  const firstName = user?.nome?.split(" ")[0] || "Visitante";

  return (
    <header className="w-full border-b border-base-200 bg-base-100/90 backdrop-blur">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden text-base-content text-2xl mr-2"
          onClick={onOpenMenu}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        {/* LOGO + TÍTULO */}
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary text-primary-content font-bold shadow-md">
            011
          </span>

          <div className="leading-tight">
            <h1 className="text-sm font-semibold text-base-content">
              011 Church
            </h1>

            {/* ⬇️ SOME NO MOBILE */}
            <p className="hidden md:block text-[11px] text-base-content/60">
              Painel administrativo
            </p>
          </div>
        </div>

        {/* USUÁRIO */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-sm font-medium text-base-content">
              {user?.nome || "Visitante"}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-base-content/50">
              {user?.role || "membro"}
            </p>
          </div>

          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-content font-semibold shadow-md">
            {firstName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
