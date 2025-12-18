import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import useAuth from "@/modules/auth/hooks/useAuth";
import useDna from "../hooks/useDna";
import {
  canEditDna,
  canDeleteDna,
} from "../utils/dnaPermissions";

export default function DnaDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { getById, remove } = useDna();

  const [dna, setDna] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDna() {
      const data = await getById(id);
      if (!data) {
        navigate("/dna");
        return;
      }

      setDna(data);
      setLoading(false);
    }

    loadDna();
  }, [id, getById, navigate]);

  if (loading) {
    return (
      <p className="text-sm text-base-content/60">
        Carregando DNA...
      </p>
    );
  }

  if (!dna) return null;

  const canEdit = canEditDna(
    user?.role,
    dna.liderId,
    user?.uid
  );

  const canDelete = canDeleteDna(user?.role);

  const handleDelete = async () => {
    if (!confirm("Deseja realmente excluir este DNA?")) return;

    await remove(dna.id);
    navigate("/dna");
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <PageHeader
        title={dna.nome}
        subtitle="Detalhes do DNA"
      />

      <Card>
        <div className="flex flex-col gap-2 text-sm">
          <p>
            <strong>Dia:</strong> {dna.dia}
          </p>

          <p>
            <strong>Horário:</strong> {dna.horario}
          </p>

          <p>
            <strong>Líder:</strong> {dna.liderNome}
          </p>
        </div>
      </Card>

      {/* AÇÕES */}
      <div className="flex gap-3">
        {canEdit && (
          <Button
            onClick={() =>
              navigate(`/dna/editar/${dna.id}`)
            }
          >
            Editar
          </Button>
        )}

        {canDelete && (
          <Button
            variant="outline"
            onClick={handleDelete}
          >
            Excluir
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={() => navigate("/dna")}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
