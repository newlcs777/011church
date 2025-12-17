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
        relative
        pb-4
        border-b
        border-base-200
      "
    >
      {/* AÇÕES À DIREITA */}
      {right && (
        <div className="absolute right-0 top-0">
          {right}
        </div>
      )}

      {/* TÍTULO */}
      <div
        className={`
          flex
          flex-col
          gap-1
          ${isCenter ? "items-center text-center" : ""}
        `}
      >
        <h1 className="text-xl md:text-2xl font-semibold text-neutral">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xs md:text-sm text-neutral/70">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
