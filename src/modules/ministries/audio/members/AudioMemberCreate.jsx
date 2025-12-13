import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import MemberForm from "../../components/MemberForm";

import { addMember } from "../../store/membersSlice";

// 🔐 AUTH
import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioMemberCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  // ⛔ BLOQUEIO TOTAL PARA QUEM NÃO PODE CRIAR
  if (!canEdit) {
    return (
      <MinistryPageWrapper>
        <div className="text-center mt-12">
          <p className="text-sm text-base-content/60">
            Você não tem permissão para adicionar membros.
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

  const handleSubmit = async (data) => {
    if (!canEdit) return;

    await dispatch(addMember({ ministry: "audio", data }));
    navigate(-1);
  };

  return (
    <MinistryPageWrapper>
      {/* TÍTULO CENTRALIZADO */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          Adicionar Membro
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          Ministério de Áudio
        </p>
      </div>

      {/* FORMULÁRIO */}
      <MemberForm onSubmit={handleSubmit} />
    </MinistryPageWrapper>
  );
}
