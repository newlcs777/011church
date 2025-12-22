import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import useAuth from "../modules/auth/hooks/useAuth";

export default function Header({ onOpenMenu }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="
        sticky
        top-0
        z-40
        w-full
        border-b
        border-base-200
        bg-base-100/95
        backdrop-blur
      "
    >
      <div
        className="
          mx-auto
          flex
          h-14
          max-w-5xl
          items-center
          justify-between
          px-3
          sm:px-4
        "
      >
        {/* ESQUERDA — VOLTAR */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-base-content/70
            hover:bg-base-200
            active:scale-[0.96]
            transition
          "
        >
          <HiOutlineArrowLeft className="text-lg" />
        </button>

        {/* CENTRO — LOGO */}
        <div className="flex items-center gap-2">
          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-primary
              text-primary-content
              text-sm
              font-bold
              shadow-sm
            "
          >
            011
          </span>

          <span className="text-sm font-semibold text-base-content">
            011 Church
          </span>
        </div>

        {/* DIREITA — MENU */}
        <button
          onClick={onOpenMenu}
          aria-label="Abrir menu"
          className="
            md:hidden
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-base-content
            hover:bg-base-200
            active:scale-[0.96]
            transition
          "
        >
          ☰
        </button>
      </div>
    </header>
  );
}
