export default function VerseCard({ verse }) {
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
        {/* CONVITE */}
        <div className="h-3 w-40 bg-base-200 rounded mx-auto" />

        {/* REFERÊNCIA */}
        <div className="h-4 w-48 bg-base-200 rounded mx-auto" />

        {/* DIVISOR */}
        <div className="h-px bg-base-200" />

        {/* TEXTO */}
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
        gap-5

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

          animate-fadeIn
          delay-75
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

          animate-fadeIn
          delay-100
        "
      >
        {reference}
      </h3>

      {/* DIVISOR */}
      <div
        className="
          h-px
          bg-base-200

          animate-fadeIn
          delay-150
        "
      />

      {/* TEXTO BÍBLICO */}
      <p
        className="
          text-sm
          leading-relaxed
          text-base-content/80

          animate-fadeIn
          delay-200
        "
      >
        {text}
      </p>
    </div>
  );
}
