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
        bg-base-100/90
        shadow-lg
        shadow-black/5
        backdrop-blur
        p-4 sm:p-5 md:p-6
        space-y-3
      `,
        className
      )}
    >
      {(title || subtitle) && (
        <header className="space-y-1">
          {title && (
            <h2 className="text-lg font-semibold text-neutral">{title}</h2>
          )}
          {subtitle && (
            <p className="text-xs text-neutral/70">{subtitle}</p>
          )}
        </header>
      )}

      <div>{children}</div>
    </section>
  );
}
