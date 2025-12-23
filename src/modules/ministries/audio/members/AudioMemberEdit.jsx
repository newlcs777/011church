import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import MemberForm from "../../components/MemberForm";

import { editMember, fetchMembers } from "../../store/membersSlice";

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

  const members = useSelector(
    (state) => state.members.audio
  );

  const loading = useSelector(
    (state) => state.members.loading
  );

  useEffect(() => {
    if (!members || members.length === 0) {
      dispatch(fetchMembers("audio"));
    }
  }, [dispatch, members]);

  const member = members?.find(
    (m) => m.id === id
  );

  if (loading || !member) {
    return (
      <MinistryPageWrapper>
        <p className="text-sm text-base-content/60 p-4 text-center">
          Carregando informações do membro…
        </p>
      </MinistryPageWrapper>
    );
  }

  if (!canEdit) {
    return (
      <MinistryPageWrapper>
        <div className="text-center mt-12 px-4">
          <p className="text-sm text-base-content/60">
            Você não possui permissão para ajustar dados de membros.
          </p>
        </div>
      </MinistryPageWrapper>
    );
  }

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
      {/* HEADER — PADRÃO EVENTCARD */}
      <div className="text-center mb-6 px-4">
        <h1 className="text-sm sm:text-base font-medium">
          Ajustar dados do membro
        </h1>

        <p className="text-sm text-base-content/60 mt-1">
          Ministério de Áudio
        </p>
      </div>

      {/* FORMULÁRIO */}
      <div
        className="
          w-full
          max-w-xl
          mx-auto
          px-4
          pb-6
        "
      >
        <MemberForm
          initialData={normalizedMember}
          onSubmit={handleSubmit}
        />
      </div>
    </MinistryPageWrapper>
  );
}
