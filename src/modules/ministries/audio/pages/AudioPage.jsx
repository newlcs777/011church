import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ✅ THUNK DO SLICE GLOBAL (ONDE OS DADOS SÃO GRAVADOS)
import { fetchMembersByMinistry } from "@/modules/members/store/membersSlice";

import MinistryPageWrapper from "@/modules/ministries/components/MinistryPageWrapper";
import { useAuthContext } from "@/modules/auth/context/AuthContext";
import { canEditMinistry } from "@/modules/auth/permissions";

export default function AudioPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();
  const canEdit = canEditMinistry(user);

  // ✅ LEITURA DO MESMO SLICE QUE O THUNK ESCREVE
  const members = useSelector(
    (state) => state.membersGlobal.byMinistry.audio
  );

  // ✅ SEMPRE BUSCA NO FIREBASE AO ABRIR (F5 OU NAVEGAÇÃO)
  useEffect(() => {
    dispatch(fetchMembersByMinistry("audio"));
  }, [dispatch]);

  return (
    <MinistryPageWrapper
      title="Ministério de Áudio"
      subtitle="Organize as pessoas e os serviços que sustentam cada culto."
    >
      {/* STATUS — PADRÃO CARD EVENTOS */}
      <div className="mt-6">
        <div
          className="
            rounded-xl
            border
            border-base-300
            bg-base-100
            p-6
            shadow-sm
            text-center
          "
        >
          <p className="text-sm text-base-content/60">
            Membros ativos
          </p>

          {/* ✅ NÚMERO REAL VINDO DO FIREBASE */}
          <p className="mt-1 text-3xl font-semibold">
            {Array.isArray(members) ? members.length : 0}
          </p>
        </div>
      </div>

      {/* AÇÕES — PADRÃO EVENTOS (MOBILE) */}
      <div className="mt-6 flex flex-col gap-4">
        {canEdit && (
          <button
            onClick={() => navigate("members/create")}
            className="
              inline-flex
              items-center
              justify-center
              text-center
              rounded-xl
              border
              border-base-300
              bg-base-100
              px-4
              py-3
              text-sm
              font-medium
              text-base-content/70
              hover:bg-base-200/70
              transition
            "
          >
            Adicionar novo membro
          </button>
        )}

        <button
          onClick={() => navigate("schedule")}
          className="
            inline-flex
            items-center
            justify-center
            text-center
            rounded-xl
            border
            border-base-300
            bg-base-100
            px-4
            py-3
            text-sm
            font-medium
            text-base-content/70
            hover:bg-base-200/70
            transition
          "
        >
          Ver escala do áudio
        </button>

        <button
          onClick={() => navigate("members")}
          className="
            inline-flex
            items-center
            justify-center
            text-center
            rounded-xl
            border
            border-base-300
            bg-base-100
            px-4
            py-3
            text-sm
            font-medium
            text-base-content/70
            hover:bg-base-200/70
            transition
          "
        >
          Lista de membros
        </button>

        <button
          onClick={() => navigate("tasks")}
          className="
            inline-flex
            items-center
            justify-center
            text-center
            rounded-xl
            border
            border-base-300
            bg-base-100
            px-4
            py-3
            text-sm
            font-medium
            text-base-content/70
            hover:bg-base-200/70
            transition
          "
        >
          Tarefas do ministério
        </button>
      </div>
    </MinistryPageWrapper>
  );
}
