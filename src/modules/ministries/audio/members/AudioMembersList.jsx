import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMembers, removeMember } from "../../store/membersSlice";

import MembersTable from "../../components/MembersTable";
import MinistryPageWrapper from "../../components/MinistryPageWrapper";

// 🔐 AUTH
import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioMembersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const members = useSelector((state) => state.members.audio);
  const loading = useSelector((state) => state.members.loading);

  useEffect(() => {
    dispatch(fetchMembers("audio"));
  }, [dispatch]);

  return (
    <MinistryPageWrapper
      title="Membros do Ministério de Áudio"
      subtitle="Pessoas que servem e colaboram nos cultos e atividades"
    >
      {/* AÇÃO PRINCIPAL — PADRÃO EVENTCARD */}
      {canEdit && (
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() =>
              navigate("/ministerios/audio/members/create")
            }
            className="
              text-xs
              font-medium
              text-base-content/60
              hover:bg-base-200
              rounded-lg
              px-3
              py-1.5
              transition
              active:scale-[0.98]
            "
          >
            + Novo membro
          </button>
        </div>
      )}

      {!canEdit && (
        <p className="text-sm text-base-content/60 mb-4">
          Visualização somente leitura
        </p>
      )}

      {/* CONTEÚDO */}
      {loading ? (
        <p className="text-sm text-base-content/60 p-4">
          Carregando membros…
        </p>
      ) : (
        <MembersTable
          members={members}
          onEdit={(id) => {
            if (!canEdit) return;
            navigate(`/ministerios/audio/members/edit/${id}`);
          }}
          onDelete={(id) => {
            if (!canEdit) return;
            dispatch(removeMember({ ministry: "audio", id }));
          }}
        />
      )}
    </MinistryPageWrapper>
  );
}
