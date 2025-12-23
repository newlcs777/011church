export default function MinistryPageWrapper({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        w-full
        max-w-4xl
        mx-auto
        px-3
        md:px-6
        py-4
      "
    >
      {/* HEADER */}
      {(title || subtitle) && (
        <div
          className="
            mb-4
            md:mb-6
            text-center
          "
        >
          {title && (
            <h1
              className="
                text-xl
                md:text-2xl
                font-semibold
                leading-tight
              "
            >
              {title}
            </h1>
          )}

          {subtitle && (
            <p
              className="
                mt-1
                text-sm
                text-base-content/70
                max-w-xl
                mx-auto
              "
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* CONTEÚDO */}
      <div
        className="
          bg-base-100

          border-0
          md:border
          md:border-base-300

          rounded-none
          md:rounded-2xl

          p-0
          md:p-6
        "
      >
        {children}
      </div>
    </div>
  );
}
