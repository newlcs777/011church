import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addMember } from "../store/membersSlice";
import MemberForm from "../components/MemberForm";

export default function MemberCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ MEMBROS JÁ CADASTRADOS (GLOBAL)
  const members = useSelector(
    (state) => state.membersGlobal.items || []
  );

  function handleSubmit(data) {
    const name = data?.name?.trim();

    if (!name) {
      alert("O nome do membro é obrigatório.");
      return;
    }

    // ✅ EVITA NOME DUPLICADO (CASE INSENSITIVE)
    const exists = members.some(
      (m) =>
        m.name?.trim().toLowerCase() ===
        name.toLowerCase()
    );

    if (exists) {
      alert("Já existe um membro cadastrado com este nome.");
      return;
    }

    // ✅ MANTÉM PADRÃO DE DADOS (SEM ALTERAR ESTRUTURA)
    const payload = {
      ...data,
      name,
    };

    dispatch(addMember(payload)).then(() => {
      navigate(-1);
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">
          Novo Membro
        </h1>

        <p className="text-sm text-base-content/60">
          Cadastro de membro da igreja
        </p>
      </div>

      {/* CARD */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
        <MemberForm onSubmit={handleSubmit} />

        {/* AÇÕES */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-medium
              tracking-wide
              text-neutral/70
              transition-all
              duration-200
              hover:bg-base-200/70
              whitespace-nowrap
            "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
