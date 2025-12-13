import useAuth from "../modules/auth/hooks/useAuth";

export default function Header({ onOpenMenu }) {
  const { user } = useAuth();
  const firstName = user?.nome?.split(" ")[0] || "Visitante";

  return (
    <header className="w-full border-b border-base-200 bg-base-100/80 backdrop-blur">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">

        {/* BOTÃO MOBILE (hambúrguer) */}
        <button
          className="md:hidden text-secondary text-2xl mr-2"
          onClick={onOpenMenu}
        >
          ☰
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <span className="h-8 w-8 flex items-center justify-center rounded-xl bg-primary text-primary-content font-bold shadow-md">
            011
          </span>

          <div>
            <h1 className="text-base font-semibold text-neutral md:text-lg">
              011 Church
            </h1>
            <p className="text-xs text-neutral/60">Painel administrativo</p>
          </div>
        </div>

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-neutral">
              {user?.nome || "Visitante"}
            </p>
            <p className="text-[11px] text-neutral/60 uppercase tracking-wide">
              {user?.role || "membro"}
            </p>
          </div>

          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-content font-semibold shadow-md md:h-10 md:w-10">
            {firstName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
