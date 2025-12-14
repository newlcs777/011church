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
      title="Ministério de Áudio"
      subtitle="Acompanhe e organize as pessoas, tarefas e escalas do ministério de áudio."
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
            flex
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <h3
            className="
              text-sm
              font-medium
              text-base-content/70
            "
          >
            Total de membros
          </h3>

          <p
            className="
              mt-1
              text-3xl
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
          grid
          grid-cols-1
          gap-2
          sm:grid-cols-2
          lg:flex
          lg:flex-wrap
          lg:items-center
        "
      >
        <button
          className="
            h-10
            px-4
            rounded-lg
            border
            border-base-300
            bg-base-100
            text-sm
            hover:bg-base-200
            transition
          "
          onClick={() => navigate("schedule")}
        >
          Escala do ministério
        </button>

        <button
          className="
            h-10
            px-4
            rounded-lg
            border
            border-base-300
            bg-base-100
            text-sm
            hover:bg-base-200
            transition
          "
          onClick={() => navigate("members")}
        >
          Lista de membros
        </button>

        {canEdit && (
          <button
            className="
              h-10
              px-4
              rounded-lg
              border
              border-base-300
              bg-base-100
              text-sm
              hover:bg-base-200
              transition
            "
            onClick={() => navigate("members/create")}
          >
            Adicionar membro
          </button>
        )}

        <button
          className="
            h-10
            px-4
            rounded-lg
            border
            border-base-300
            bg-base-100
            text-sm
            hover:bg-base-200
            transition
          "
          onClick={() => navigate("tasks")}
        >
          Tarefas do ministério
        </button>
      </div>
    </MinistryPageWrapper>
  );
}
