import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import MemberForm from "../../components/MemberForm";

import { editMember } from "../../store/membersSlice";

// 🔐 AUTH
import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioMemberEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const member = useSelector((state) =>
    state.members.audio.find((m) => m.id === id)
  );

  if (!member) {
    return (
      <MinistryPageWrapper>
        <p className="text-sm text-base-content/60">
          Carregando...
        </p>
      </MinistryPageWrapper>
    );
  }

  // ⛔ BLOQUEIO TOTAL PARA QUEM NÃO PODE EDITAR
  if (!canEdit) {
    return (
      <MinistryPageWrapper>
        <div className="text-center mt-12">
          <p className="text-sm text-base-content/60">
            Você não tem permissão para editar membros.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="
              mt-4
              btn
              btn-ghost
              btn-sm
            "
          >
            Voltar
          </button>
        </div>
      </MinistryPageWrapper>
    );
  }

  // ===============================
  // NORMALIZAÇÃO COMPLETA (OBRIGATÓRIA)
  // ===============================
  const normalizedMember = {
    name: member.name || "",
    phone: member.phone || "",
    email: member.email || "",
    address: member.address || "",
    birthDate: member.birthDate || "",
    role: member.role || "",
    availability: member.availability || "",
    isActive: member.isActive ?? true,
    termSigned: member.termSigned ?? false,
    notes: member.notes || "",
  };

  const handleSubmit = async (data) => {
    if (!canEdit) return;

    await dispatch(
      editMember({
        ministry: "audio",
        id,
        data,
      })
    );

    navigate(-1);
  };

  return (
    <MinistryPageWrapper>
      {/* 🔙 VOLTAR */}
      <div className="mb-4">
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
      </div>

      {/* TÍTULO CENTRALIZADO */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          Editar Membro
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          Ministério de Áudio
        </p>
      </div>

      {/* FORMULÁRIO */}
      <MemberForm
        initialData={normalizedMember}
        onSubmit={handleSubmit}
      />
    </MinistryPageWrapper>
  );
}
