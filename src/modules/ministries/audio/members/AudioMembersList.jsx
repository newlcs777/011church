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
    <MinistryPageWrapper title="Membros — Ministério de Áudio">
      {/* HEADER AÇÕES */}
      <div className="flex items-center justify-between mb-4">
        {/* 🔙 VOLTAR */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            btn
            btn-ghost
            btn-sm
            focus:outline-none
            focus:ring-0
          "
        >
          ← Voltar
        </button>

        {/* ➕ ADICIONAR MEMBRO — SOMENTE GESTÃO */}
        {canEdit && (
          <button
            type="button"
            onClick={() =>
              navigate("/ministerios/audio/members/create")
            }
            className="
              btn
              btn-outline
              btn-sm
              rounded-lg
              bg-base-200
              hover:bg-base-300
              focus:outline-none
              focus:ring-0
            "
          >
            + Novo Membro
          </button>
        )}
      </div>

      {!canEdit && (
        <p className="text-xs text-base-content/60 mb-3">
          Visualização somente leitura
        </p>
      )}

      {/* CONTEÚDO */}
      {loading ? (
        <p className="text-sm text-base-content/60 p-4">
          Carregando…
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
