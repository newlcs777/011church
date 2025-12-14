export default function VerseSkeleton() {
  return (
    <div
      className="
        rounded-2xl
        bg-base-100
        border
        border-base-300
        p-6
        shadow-sm
        flex
        flex-col
        gap-4
        animate-pulse
      "
    >
      {/* TÍTULO */}
      <div className="h-3 w-40 bg-base-200 rounded mx-auto" />

      {/* REFERÊNCIA */}
      <div className="h-4 w-48 bg-base-200 rounded mx-auto" />

      {/* DIVISOR */}
      <div className="h-px bg-base-200 my-1" />

      {/* TEXTO */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-base-200 rounded" />
        <div className="h-3 w-[90%] bg-base-200 rounded" />
        <div className="h-3 w-[80%] bg-base-200 rounded" />
      </div>
    </div>
  );
}
