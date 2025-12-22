import { NavLink } from "react-router-dom";
import Card from "@/components/ui/Card";

import {
  HiOutlineBookOpen,
  HiOutlineMegaphone,
  HiOutlineCalendarDays,
  HiOutlineBeaker,
} from "react-icons/hi2";

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
        {/* BÍBLIA */}
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
          <HiOutlineBookOpen className="text-base" />
          <span className="flex-1">Bíblia</span>
        </NavLink>

        {/* COMUNICADOS */}
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
          <HiOutlineMegaphone className="text-base" />
          <span className="flex-1">Comunicados</span>
        </NavLink>

        {/* EVENTOS */}
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
          <HiOutlineCalendarDays className="text-base" />
          <span className="flex-1">Eventos</span>
        </NavLink>

        {/* DNA */}
        <NavLink
          to="/dna"
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
          <HiOutlineBeaker className="text-base" />
          <span className="flex-1">DNA</span>
        </NavLink>
      </div>
    </Card>
  );
}
