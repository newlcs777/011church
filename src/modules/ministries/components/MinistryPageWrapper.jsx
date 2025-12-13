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
        p-4
        md:p-6
      "
    >
      {/* HEADER */}
      <div className="mb-4">
        <h1
          className="
            text-2xl
            font-bold
            leading-tight
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
              mt-1
              text-sm
              text-base-content/70
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* CONTEÚDO */}
      <div
        className="
          bg-base-100
          border
          border-base-300
          rounded-xl
          p-4
          md:p-6
        "
      >
        {children}
      </div>
    </div>
  );
}
