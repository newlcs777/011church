import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMembers } from "../store/membersSlice";
import MembersTable from "../components/MembersTable";

export default function MembersListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector(
    (state) => state.membersGlobal
  );

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  // ✅ ORDENAÇÃO ALFABÉTICA (A–Z) POR NOME
  const sortedMembers = useMemo(() => {
    if (!Array.isArray(items)) return [];

    return [...items].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "", "pt-BR", {
        sensitivity: "base",
      })
    );
  }, [items]);

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div
        className="
          grid
          grid-cols-3
          items-center
        "
      >
        {/* espaço vazio à esquerda */}
        <div />

        {/* TÍTULO CENTRAL */}
        <h1
          className="
            text-lg
            font-semibold
            text-center
          "
        >
          Membros
        </h1>

        {/* BOTÃO À DIREITA */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/members/create")}
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
            + Novo membro
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-base-content/60">
          Carregando…
        </p>
      )}

      <MembersTable
        members={sortedMembers}
        onEdit={(id) => navigate(`/members/edit/${id}`)}
      />
    </div>
  );
}
