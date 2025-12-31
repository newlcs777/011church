import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchMembersByMinistry,
  addMember,
} from "../../members/store/membersSlice";
import MemberForm from "../components/MemberForm";

import { useAuthContext } from "../../../auth/context/AuthContext";

export default function MembersPage() {
  const { ministry } = useParams();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const members = useSelector(
    (state) => state.members.byMinistry[ministry] || []
  );
  const loading = useSelector((state) => state.members.loading);

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(fetchMembersByMinistry(ministry));
  }, [dispatch, ministry]);

  function handleCreate(data) {
    if (!canEdit) return;

    dispatch(addMember(data));
    dispatch(fetchMembersByMinistry(ministry));
    setOpenForm(false);
  }

  return (
    <div className="p-4 md:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold capitalize">
          Membros — {ministry}
        </h1>

        {canEdit && (
          <button
            onClick={() => setOpenForm(true)}
            className="btn btn-primary btn-sm rounded-lg"
          >
            + Novo
          </button>
        )}
      </div>

      {!canEdit && (
        <p className="text-xs text-base-content/60 mt-1">
          Visualização somente leitura
        </p>
      )}

      {/* LISTA */}
      <div className="mt-6 flex flex-col gap-3">
        {loading ? (
          <div className="text-sm text-base-content/60">
            Carregando…
          </div>
        ) : members.length === 0 ? (
          <div className="text-sm text-base-content/60">
            Nenhum membro cadastrado ainda.
          </div>
        ) : (
          members.map((m) => (
            <div
              key={m.id}
              className="bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm"
            >
              <p className="text-sm font-medium">{m.name}</p>

              <p className="text-sm text-base-content/70">
                {m.role}
              </p>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {openForm && canEdit && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-base-100 rounded-xl shadow-xl p-4">
            <MemberForm
              ministry={ministry}
              onSubmit={handleCreate}
            />

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setOpenForm(false)}
                className="btn btn-ghost btn-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
