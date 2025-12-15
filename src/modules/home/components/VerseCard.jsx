import { useNavigate } from "react-router-dom";

export default function VerseCard({ verse }) {
  const navigate = useNavigate();

  if (!verse?.book || !verse?.chapter) return null;

  const handleClick = () => {
    navigate("/bible/read", {
      state: {
        book: verse.book,
        chapter: verse.chapter,
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      className="
        rounded-2xl
        bg-base-100
        border
        border-base-300
        p-6
        shadow-sm
        flex
        flex-col
        gap-3
        cursor-pointer
        hover:shadow-md
        hover:border-primary/40
        transition
      "
    >
      <p className="text-xs uppercase tracking-wider text-base-content/60 text-center">
        Estudo do dia
      </p>

      <h3 className="text-lg font-semibold text-center">
        {verse.reference}
      </h3>

      <p className="text-sm text-base-content/70 text-center">
        Toque para abrir o capítulo completo
      </p>
    </div>
  );
}
