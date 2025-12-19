export default function PageHeader({
  title,
  subtitle,
  right,
}) {
  return (
    <div className="relative pb-4 border-b border-base-200">
      {/* AÇÃO À DIREITA */}
      {right && (
        <div className="absolute right-0 top-0">
          {right}
        </div>
      )}

      {/* TÍTULO */}
      <div className="flex flex-col items-center gap-1 text-center px-6">
        <h1 className="text-xl md:text-2xl font-semibold text-neutral">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xs md:text-sm text-neutral/70 max-w-md">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
