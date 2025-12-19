import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaUser,
  FaClock,
  FaCalendarDay,
} from "react-icons/fa";

import PageHeader from "@/components/ui/PageHeader";
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
      <p className="text-sm text-base-content/60 text-center">
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
    if (!confirm("Deseja realmente excluir este DNA?"))
      return;

    await remove(dna.id);
    navigate("/dna");
  };

  return (
    <div
      className="
        max-w-xl
        mx-auto
        flex
        flex-col
        gap-6
        pb-6
      "
    >
      {/* HEADER */}
      <PageHeader
        title={dna.nome}
        subtitle="Detalhes do DNA"
        right={
          <Button
            variant="ghost"
            onClick={() => navigate("/dna")}
            className="
              flex
              items-center
              gap-2
            "
          >
            <FaArrowLeft size={14} />
            Voltar
          </Button>
        }
      />

      {/* INFORMAÇÕES */}
      <section
        className="
          bg-base-100
          rounded-2xl
          p-6
          flex
          flex-col
          gap-4
        "
      >
        <h3
          className="
            text-base
            font-semibold
          "
        >
          Informações do grupo
        </h3>

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-base-content/80
          "
        >
          <FaCalendarDay className="text-base-content/60" />
          <span>
            <strong className="font-medium">Dia:</strong>{" "}
            {dna.dia}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-base-content/80
          "
        >
          <FaClock className="text-base-content/60" />
          <span>
            <strong className="font-medium">
              Horário:
            </strong>{" "}
            {dna.horario}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-base-content/80
          "
        >
          <FaUser className="text-base-content/60" />
          <span>
            <strong className="font-medium">Líder:</strong>{" "}
            {dna.liderNome}
          </span>
        </div>
      </section>

      {/* AÇÕES */}
      <div
        className="
          flex
          items-center
          gap-3
          pt-2
        "
      >
        {canEdit && (
          <Button
            variant="ghost"
            onClick={() =>
              navigate(`/dna/editar/${dna.id}`)
            }
            className="
              flex
              items-center
              gap-2
              text-sm
            "
          >
            <FaEdit size={14} />
            Editar
          </Button>
        )}

        {canDelete && (
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="
              flex
              items-center
              gap-2
              text-sm
              text-error
              hover:text-error
            "
          >
            <FaTrash size={14} />
            Excluir
          </Button>
        )}
      </div>
    </div>
  );
}
