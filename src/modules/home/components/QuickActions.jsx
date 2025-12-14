import { NavLink } from "react-router-dom";
import Card from "@/components/ui/Card";

export default function QuickActions() {
  return (
    <Card title="Ações rápidas">
      <div
        className="
          flex
          flex-col
          gap-2
        "
      >
        <NavLink
          to="/bible"
          className="
            flex
            items-center
            gap-3
            rounded-lg
            border
            border-base-300
            px-3
            py-2
            text-sm
            font-medium
            transition
            hover:bg-base-200
            active:scale-[0.98]
          "
        >
          <span className="text-sm">📖</span>
          <span className="flex-1">Bíblia</span>
        </NavLink>

        <NavLink
          to="/comunicados"
          className="
            flex
            items-center
            gap-3
            rounded-lg
            border
            border-base-300
            px-3
            py-2
            text-sm
            font-medium
            transition
            hover:bg-base-200
            active:scale-[0.98]
          "
        >
          <span className="text-sm">📣</span>
          <span className="flex-1">Comunicados</span>
        </NavLink>

        <NavLink
          to="/eventos"
          className="
            flex
            items-center
            gap-3
            rounded-lg
            border
            border-base-300
            px-3
            py-2
            text-sm
            font-medium
            transition
            hover:bg-base-200
            active:scale-[0.98]
          "
        >
          <span className="text-sm">📅</span>
          <span className="flex-1">Eventos</span>
        </NavLink>
      </div>
    </Card>
  );
}
