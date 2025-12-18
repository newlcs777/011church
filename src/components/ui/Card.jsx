import clsx from "clsx";

export default function Card({
  children,
  className = "",
  title,
  subtitle,
}) {
  return (
    <section
      className={clsx(
        `
        rounded-2xl
        border
        border-base-300/60
        bg-base-100
        shadow-sm
        transition
        hover:shadow-md
        hover:border-base-300
        p-4 sm:p-5 md:p-6
        space-y-4
        `,
        className
      )}
    >
      {(title || subtitle) && (
        <header className="space-y-1">
          {title && (
            <h2 className="text-base font-semibold text-neutral">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs text-neutral/70">
              {subtitle}
            </p>
          )}
        </header>
      )}

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}
