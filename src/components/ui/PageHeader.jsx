export default function PageHeader({ title, subtitle, right }) {
  return (
    <div
      className="
        flex flex-col gap-3 pb-4
        border-b border-base-200
        md:flex-row md:items-center md:justify-between
      "
    >
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-semibold text-neutral">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xs md:text-sm text-neutral/70">{subtitle}</p>
        )}
      </div>

      {right && (
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          {right}
        </div>
      )}
    </div>
  );
}
