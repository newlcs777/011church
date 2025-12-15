import { useNavigate } from "react-router-dom";

export default function VerseCard({ verse }) {
  const navigate = useNavigate();

  // 🔹 SKELETON INTERNO
  if (!verse) {
    return (
      <div
        className="
          rounded-2xl
          bg-base-100
          border
          border-base-300
          p-6
          shadow-sm
          flex
          flex-col
          gap-4
          animate-pulse
        "
      >
        <div className="h-3 w-40 bg-base-200 rounded mx-auto" />
        <div className="h-4 w-48 bg-base-200 rounded mx-auto" />
        <div className="h-px bg-base-200" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-base-200 rounded" />
          <div className="h-3 w-[90%] bg-base-200 rounded" />
          <div className="h-3 w-[80%] bg-base-200 rounded" />
        </div>
      </div>
    );
  }

  const reference = verse.reference || "Versículo do dia";

  const text =
    typeof verse.text === "string"
      ? verse.text
      : verse.text?.text || verse.text?.verse || "";

  // 🔹 clique → abre direto o modo leitura
  const handleClick = () => {
    if (!verse?.book || !verse?.chapter || !verse?.verse) return;

    navigate("/bible/read", {
      state: {
        book: verse.book,
        chapter: verse.chapter,
        verse: verse.verse, // 🔹 versículo exato
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
        gap-5
        cursor-pointer

        hover:shadow-md
        hover:border-primary/40
        transition

        animate-fadeInUp
      "
    >
      {/* CONVITE */}
      <p
        className="
          text-xs
          uppercase
          tracking-wider
          text-base-content/60
          text-center
        "
      >
        Palavra para o seu dia
      </p>

      {/* REFERÊNCIA */}
      <h3
        className="
          text-base
          font-semibold
          text-base-content
          text-center
        "
      >
        {reference}
      </h3>

      {/* DIVISOR */}
      <div className="h-px bg-base-200" />

      {/* TEXTO BÍBLICO */}
      <p
        className="
          text-sm
          leading-relaxed
          text-base-content/80
        "
      >
        {text}
      </p>
    </div>
  );
}
