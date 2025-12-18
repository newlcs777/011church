export default function PageHeader({
  title,
  subtitle,
  right,
  align = "left",
}) {
  const isCenter = align === "center";

  return (
    <div
      className="
        pb-4
        border-b
        border-base-200
      "
    >
      <div
        className={`
          grid
          grid-cols-3
          items-center
          ${isCenter ? "text-center" : ""}
        `}
      >
        {/* COLUNA ESQUERDA (reserva espaço) */}
        <div />

        {/* TÍTULO CENTRAL */}
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-neutral">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xs md:text-sm text-neutral/70">
              {subtitle}
            </p>
          )}
        </div>

        {/* AÇÕES À DIREITA */}
        <div className="flex justify-end">
          {right}
        </div>
      </div>
    </div>
  );
}
