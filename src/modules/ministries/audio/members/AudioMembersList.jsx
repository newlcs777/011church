import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchMembers,
  fetchMembersByMinistry,
  removeMemberFromMinistry,
} from "@/modules/members/store/membersSlice";

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

  // 🔹 membros globais da igreja
  const allMembers = useSelector(
    (state) => state.membersGlobal.items || []
  );

  // 🔹 vínculos do áudio
  const audioLinks = useSelector(
    (state) => state.membersGlobal.byMinistry?.audio || []
  );

  const loading = useSelector(
    (state) => state.membersGlobal.loading
  );

  // ✅ CONTADOR
  const membersCount = audioLinks.length;

  // ✅ JOIN ESTÁVEL
  const members = useMemo(() => {
    if (!allMembers.length || !audioLinks.length) return [];

    return audioLinks
      .map((link) =>
        allMembers.find((m) => m.id === link.id)
      )
      .filter(Boolean);
  }, [audioLinks, allMembers]);

  useEffect(() => {
    dispatch(fetchMembers());              // 🔴 FALTAVA ISSO
    dispatch(fetchMembersByMinistry("audio"));
  }, [dispatch]);

  return (
    <MinistryPageWrapper
      title="Membros do Ministério de Áudio"
      subtitle={`Pessoas vinculadas ao ministério de áudio • ${membersCount} membro(s)`}
    >
      {canEdit && (
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() =>
              navigate("/ministerios/audio/members/link")
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
            + Vincular membro
          </button>
        </div>
      )}

      {!canEdit && (
        <p className="text-sm text-base-content/60 mb-4">
          Visualização somente leitura
        </p>
      )}

      {loading ? (
        <p className="text-sm text-base-content/60 p-4">
          Carregando membros…
        </p>
      ) : (
        <MembersTable
          members={members}
          onEdit={(id) => {
            if (!canEdit) return;
            navigate(`/members/edit/${id}`);
          }}
          onDelete={(id) => {
            if (!canEdit) return;
            dispatch(
              removeMemberFromMinistry({
                ministry: "audio",
                memberId: id,
              })
            );
          }}
        />
      )}
    </MinistryPageWrapper>
  );
}
