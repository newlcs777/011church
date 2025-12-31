import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchMembers,
  fetchMembersByMinistry,
  addMemberToMinistry,
} from "@/modules/members/store/membersSlice";

import MembersTable from "@/modules/members/components/MembersTable";
import MinistryPageWrapper from "../../components/MinistryPageWrapper";

import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioMemberLink() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false); // ✅ CONTROLE DE ESTADO

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const allMembers = useSelector(
    (state) => state.membersGlobal.items || []
  );

  const audioMembers = useSelector(
    (state) => state.membersGlobal.byMinistry.audio || []
  );

  const loading = useSelector(
    (state) => state.membersGlobal.loading
  );

  useEffect(() => {
    async function load() {
      setReady(false);

      await dispatch(fetchMembers());
      await dispatch(fetchMembersByMinistry("audio"));

      setReady(true);
    }

    load();
  }, [dispatch]);

  // 🔎 FILTRO FINAL (SÓ QUANDO ESTÁ PRONTO)
  const filtered = useMemo(() => {
    if (!ready) return [];

    const q = search.toLowerCase().trim();

    return allMembers.filter((m) => {
      const match =
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.phone?.includes(q);

      const alreadyInAudio = audioMembers.some(
        (a) => a.id === m.id
      );

      return match && !alreadyInAudio;
    });
  }, [allMembers, audioMembers, search, ready]);

  if (!canEdit) {
    return (
      <MinistryPageWrapper
        title="Vincular membros"
        subtitle="Você não tem permissão"
      />
    );
  }

  return (
    <MinistryPageWrapper
      title="Vincular membro ao Áudio"
      subtitle="Busque membros já cadastrados na igreja"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nome, email ou telefone"
        className="
          w-full
          mb-4
          rounded-lg
          border
          border-base-300
          px-3
          py-2
          text-sm
        "
      />

      {!ready || loading ? (
        <p className="text-sm p-4 text-base-content/60">
          Carregando membros…
        </p>
      ) : (
        <MembersTable
          members={filtered}
          actionLabel="Adicionar"
          onAction={async (id) => {
            await dispatch(
              addMemberToMinistry({
                ministry: "audio",
                memberId: id,
              })
            ).unwrap();

            // 🔑 garante consistência visual
            await dispatch(fetchMembersByMinistry("audio"));
          }}
        />
      )}

     
    </MinistryPageWrapper>
  );
}
