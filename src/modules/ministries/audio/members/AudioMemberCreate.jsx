import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import MemberForm from "../../components/MemberForm";

import { addMember } from "../../store/membersSlice";

// 🔐 AUTH
import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioMemberCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const [saving, setSaving] = useState(false);

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  // ⛔ BLOQUEIO TOTAL PARA QUEM NÃO TEM PERMISSÃO
  if (!canEdit) {
    return (
      <MinistryPageWrapper>
        <div className="mt-16 text-center">
          <p className="text-sm text-base-content/60">
            Você não tem permissão para adicionar membros ao ministério.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="
              mt-6
              h-9
              px-4
              rounded-lg
              border
              border-base-300
              bg-base-100
              text-sm
              hover:bg-base-200
              transition
            "
          >
            Voltar
          </button>
        </div>
      </MinistryPageWrapper>
    );
  }

  async function handleSubmit(data) {
    if (!data || saving) return;

    try {
      setSaving(true);

      await dispatch(
        addMember({
          ministry: "audio",
          data,
        })
      ).unwrap();

      navigate(-1);
    } catch (err) {
      console.error("Erro ao adicionar membro:", err);
      alert("Erro ao salvar o membro. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <MinistryPageWrapper>
      {/* TÍTULO */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">
          Adicionar membro
        </h1>
        <p className="mt-1 text-sm text-base-content/60">
          Ministério de Áudio
        </p>
      </div>

      {/* FORMULÁRIO */}
      <MemberForm
        onSubmit={handleSubmit}
        disabled={saving}
      />
    </MinistryPageWrapper>
  );
}
