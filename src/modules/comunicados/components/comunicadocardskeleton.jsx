export default function ComunicadoCardSkeleton() {
  return (
    <div
      className="
        rounded-xl
        border
        border-base-300
        bg-base-100
        p-6
        animate-pulse
      "
    >
      <div className="flex gap-6">
        {/* DATA */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-lg
            bg-base-200
            px-4
            py-3
            min-w-[72px]
            gap-2
          "
        >
          <div className="h-5 w-6 rounded bg-base-300" />
          <div className="h-3 w-10 rounded bg-base-300" />
        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-4 flex-1">
          {/* TÍTULO */}
          <div className="h-4 w-2/3 rounded bg-base-200" />

          {/* DESCRIÇÃO */}
          <div className="h-3 w-full rounded bg-base-200" />
          <div className="h-3 w-5/6 rounded bg-base-200" />

          {/* INFO */}
          <div className="flex gap-4 items-center">
            <div className="h-6 w-20 rounded-full bg-base-200" />
            <div className="h-3 w-32 rounded bg-base-200" />
          </div>

          {/* CTA */}
          <div className="pt-2">
            <div className="h-6 w-24 rounded-xl bg-base-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
