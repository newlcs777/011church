import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  editMember,
  removeMember,
} from "../store/membersSlice";

import MemberForm from "../components/MemberForm";

export default function MemberEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const member = useSelector((state) =>
    state.membersGlobal.items.find((m) => m.id === id)
  );

  function handleSubmit(data) {
    dispatch(editMember({ id, data })).then(() => {
      navigate("/members");
    });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este membro? Esta ação não pode ser desfeita."
    );

    if (!confirmed) return;

    dispatch(removeMember(id)).then(() => {
      navigate("/members");
    });
  }

  if (!member) {
    return (
      <p className="p-6 text-sm text-base-content/60">
        Carregando...
      </p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-lg font-semibold">
        Editar Membro
      </h1>

      <MemberForm
        initialData={member}
        onSubmit={handleSubmit}
      />

      {/* AÇÕES PERIGOSAS */}
      <div className="border-t border-base-300 pt-4 flex justify-end">
        <button
          type="button"
          onClick={handleDelete}
          className="
            text-xs
            font-medium
            text-error
            hover:bg-error/10
            rounded-lg
            px-4
            py-2
            transition
          "
        >
          Excluir membro
        </button>
      </div>
    </div>
  );
}
