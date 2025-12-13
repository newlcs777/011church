export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-medium text-neutral/80">
          {label}
        </label>
      )}

      <input
        className={`
          w-full
          rounded-xl
          border
          border-base-300
          bg-base-100
          px-3
          py-2.5
          text-sm
          text-neutral
          placeholder:text-neutral/40
          focus:border-primary
          focus:ring-2
          focus:ring-primary/30
          ${className}
        `}
        {...props}
      />

      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
