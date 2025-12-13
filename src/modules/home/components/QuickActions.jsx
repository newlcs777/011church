import { Link } from "react-router-dom";

export default function QuickActions() {
  const actions = [
    { label: "Bíblia", path: "/bible", icon: "📖" },
    { label: "Eventos", path: "/eventos", icon: "📅" },
    { label: "Comunicados", path: "/comunicados", icon: "📢" },
    { label: "Louvor", path: "/louvor", icon: "🎵" },
    { label: "Escalas", path: "/escalas", icon: "📝" },
  ];

  return (
    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
      "
    >
      {actions.map((a) => (
        <Link
          key={a.label}
          to={a.path}
          className="
            group
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-base-200
            bg-base-100
            px-3
            py-2.5
            text-sm
            font-medium
            text-neutral
            shadow-sm
            transition
            duration-200
            hover:-translate-y-0.5
            hover:border-primary/60
            hover:shadow-md
          "
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">{a.icon}</span>
            {a.label}
          </span>
          <span className="text-xs text-primary group-hover:translate-x-0.5 transition">
            Abrir
          </span>
        </Link>
      ))}
    </div>
  );
}
