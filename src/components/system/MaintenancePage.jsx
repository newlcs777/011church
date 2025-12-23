import { FaTools, FaPrayingHands } from "react-icons/fa";

export default function MaintenancePage({
  title = "Página em Manutenção",
  message = "Estamos preparando este espaço com carinho. Em breve estará disponível.",
  gifUrl,
}) {
  return (
    <div
      className="
        min-h-[60vh]
        flex
        flex-col
        items-center
        justify-center
        text-center
        gap-4
        px-4
      "
    >
      {/* GIF (opcional) */}
      {gifUrl && (
        <img
          src={gifUrl}
          alt="Em manutenção"
          className="
            w-40
            max-w-full
            rounded-xl
            shadow-sm
          "
        />
      )}

      {/* ÍCONE */}
      <FaTools
        className="
          text-4xl
          text-base-content/40
        "
      />

      {/* TÍTULO */}
      <h1
        className="
          text-lg
          font-semibold
        "
      >
        {title}
      </h1>

      {/* MENSAGEM */}
      <p
        className="
          text-sm
          text-base-content/70
          max-w-md
        "
      >
        {message}
      </p>

      {/* ORAÇÃO */}
      <div
        className="
          mt-2
          flex
          items-center
          gap-2
          text-xs
          text-base-content/50
        "
      >
        <FaPrayingHands className="text-sm" />
        <span>
          Ore pela minha vida e ministério —{" "}
          <strong className="font-medium">
            Lucas Serralheiro Cardoso
          </strong>
        </span>
      </div>
    </div>
  );
}
