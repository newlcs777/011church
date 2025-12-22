export default function PersonCardSkeleton() {
  return (
    <div
      className="
        relative
        group
        bg-base-100
        rounded-2xl
        border
        border-base-300
        p-4
        sm:p-5
        animate-pulse
      "
    >
      {/* BOTÃO EDITAR (SKELETON) */}
      <div
        className="
          absolute
          top-3
          right-3
          h-4
          w-4
          rounded
          bg-base-300
        "
      />

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-3
          sm:gap-6
        "
      >
        {/* BLOCO VISUAL */}
        <div
          className="
            flex
            flex-row
            sm:flex-col
            items-center
            sm:justify-center
            rounded-lg
            bg-base-200
            px-3
            py-2
            sm:px-4
            sm:py-3
            min-w-0
            sm:min-w-[72px]
            gap-2
          "
        >
          <div className="h-4 w-4 bg-base-300 rounded" />
          <div className="h-3 w-14 bg-base-300 rounded" />
        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-3 flex-1">
          {/* NOME */}
          <div className="h-4 w-2/3 bg-base-300 rounded" />

          {/* INFOS */}
          <div className="flex gap-3 items-center">
            <div className="h-3 w-24 bg-base-300 rounded" />
            <div className="h-4 w-4 bg-base-300 rounded-full" />
          </div>

          {/* ENDEREÇO */}
          <div className="h-3 w-full bg-base-300 rounded" />
        </div>
      </div>
    </div>
  );
}
