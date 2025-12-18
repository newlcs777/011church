import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import useAuth from "@/modules/auth/hooks/useAuth";
import useDna from "../hooks/useDna";
import useDnaSearch from "../hooks/useDnaSearch";
import { canCreateDna } from "../utils/dnaPermissions";

import DnaCard from "../components/DnaCard";

export default function DnaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { getAll } = useDna();
  const { searchNearby } = useDnaSearch();

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [dnas, setDnas] = useState([]);

  const canCreate = canCreateDna(user?.role);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getAll();
        if (mounted) setDnas(data);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [getAll]);
async function handleSearchNearby() {
  setSearching(true);
  setSearched(true);

  const result = await searchNearby();

  // ✅ SEM CONDIÇÃO
  setDnas(result || []);

  setSearching(false);
}


  return (
    <div className="flex flex-col gap-6">
      {/* HEADER DA PÁGINA */}
<div className="flex flex-col gap-4 mt-8">
  {/* Título 100% centralizado */}
  <div className="w-full text-center">
    <PageHeader
      title="Grupos DNA"
      subtitle="Pequenos grupos para viver a fé, criar comunhão e crescer juntos"
      center
    />
  </div>

  {/* Ações do header (embaixo do título) */}
  <div className="flex items-center justify-between px-2">
    {canCreate ? (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/dna/novo")}
      >
        Criar DNA
      </Button>
    ) : (
      <span />
    )}

    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
    >
      Voltar
    </Button>
  </div>
</div>

      {/* Ação principal */}
      <Card>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-base-content/70 text-center">
            Encontre um grupo DNA perto de você e conecte-se com a igreja
            durante a semana.
          </p>

          <Button
            variant="ghost"
            onClick={handleSearchNearby}
            disabled={searching}
            className="mx-auto"
          >
            {searching
              ? "Procurando DNAs próximos..."
              : "📍 Encontrar um DNA perto de mim"}
          </Button>
        </div>
      </Card>

      {/* Estados */}
      {(loading || searching) && (
        <p className="text-sm text-base-content/60 text-center">
          {searching
            ? "Estamos procurando grupos próximos de você..."
            : "Carregando grupos DNA..."}
        </p>
      )}

      {searched && !searching && dnas.length === 0 && (
        <p className="text-sm text-base-content/60 text-center">
          No momento, não encontramos nenhum grupo DNA próximo de você.
        </p>
      )}

      {/* Lista */}
      {dnas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dnas.map((dna) => (
            <DnaCard
              key={dna.id}
              dna={dna}
              canEdit={
                user?.role === "admin" ||
                user?.role === "pastor" ||
                (user?.role === "lider" &&
                  dna.liderId === user?.id)
              }
              onEdit={() => navigate(`/dna/${dna.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
