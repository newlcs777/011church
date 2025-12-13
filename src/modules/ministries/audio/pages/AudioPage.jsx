import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMembers } from "@/modules/ministries/store/membersSlice";
import MinistryPageWrapper from "@/modules/ministries/components/MinistryPageWrapper";

import { useAuthContext } from "@/modules/auth/context/AuthContext";
import { canEditMinistry } from "@/modules/auth/permissions";


export default function AudioIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();
  const canEdit = canEditMinistry(user);

  const members = useSelector((state) => state.members.audio || []);

  useEffect(() => {
    dispatch(fetchMembers("audio"));
  }, [dispatch]);

  return (
    <MinistryPageWrapper
      title="Áudio"
      subtitle="Gerencie os membros, tarefas e escalas do ministério de áudio"
    >
      {/* CARD DE STATUS */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
        "
      >
        <div
          className="
            bg-base-100
            border
            border-base-300
            rounded-xl
            p-4
            shadow-sm
          "
        >
          <h3
            className="
              text-sm
              font-medium
              text-base-content/70
            "
          >
            Membros
          </h3>

          <p
            className="
              mt-1
              text-2xl
              font-semibold
            "
          >
            {members.length}
          </p>
        </div>
      </div>

      {/* AÇÕES PRINCIPAIS */}
      <div
        className="
          mt-6
          flex
          flex-wrap
          items-center
          gap-2
        "
      >
        {/* ESCALA (todos veem) */}
        <button
          className="
            btn
            btn-outline
            btn-sm
            rounded-lg
            focus:outline-none
            focus:ring-0
            hover:bg-base-200
            transition-all
          "
          onClick={() => navigate("schedule")}
        >
          Ver Escala
        </button>

        {/* MEMBROS (todos veem) */}
        <button
          className="
            btn
            btn-outline
            btn-sm
            rounded-lg
            focus:outline-none
            focus:ring-0
            hover:bg-base-200
            transition-all
          "
          onClick={() => navigate("members")}
        >
          Membros
        </button>

        {/* NOVO MEMBRO (somente quem pode editar) */}
        {canEdit && (
          <button
            className="
              btn
              btn-outline
              btn-sm
              rounded-lg
              focus:outline-none
              focus:ring-0
              hover:bg-base-200
              transition-all
            "
            onClick={() => navigate("members/create")}
          >
            + Novo
          </button>
        )}

        {/* TAREFAS (todos veem) */}
        <button
          className="
            btn
            btn-outline
            btn-sm
            rounded-lg
            focus:outline-none
            focus:ring-0
            hover:bg-base-200
            transition-all
          "
          onClick={() => navigate("tasks")}
        >
          Tarefas
        </button>
      </div>
    </MinistryPageWrapper>
  );
}
