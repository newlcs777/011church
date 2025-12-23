import { FaSearch } from "react-icons/fa";

export default function CursoSearch({
  value,
  onChange,
  placeholder = "Buscar aula ou curso",
}) {
  return (
    <div
      className="
        relative
        w-full
      "
    >
      <FaSearch
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-base-content/40
          text-sm
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          pl-9
          pr-3
          py-2.5
          text-sm
          rounded-xl
          bg-base-100
          border
          border-base-300
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-base-300
        "
      />
    </div>
  );
}
