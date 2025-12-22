import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import useAuth from "@/modules/auth/hooks/useAuth";

import useDna from "../hooks/useDna";
import { canCreateDna } from "../utils/dnaPermissions";
import DnaForm from "../components/DnaForm";

export default function DnaEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isNew = !id;
  const { getById, create, update, remove } = useDna();
  const canCreate = canCreateDna(user?.role);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔒 BLOQUEIO DE ACESSO
  useEffect(() => {
    if (isNew && !canCreate) {
      navigate("/dna");
    }
  }, [isNew, canCreate, navigate]);

  // ✏️ CARREGAR DNA PARA EDIÇÃO
  useEffect(() => {
    if (!isNew) {
      async function load() {
        const dna = await getById(id);
        if (!dna) return navigate("/dna");
        setInitialData(dna);
      }
      load();
    }
  }, [id, isNew, getById, navigate]);

  async function handleSubmit(data) {
    if (!user?.id) {
      alert("Usuário não autenticado");
      return;
    }

    setLoading(true);

    try {
      if (isNew) {
        await create({
          ...data,
          liderId: user.id,
        });
      } else {
        await update(id, data);
      }

      navigate("/dna");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este DNA?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    try {
      await remove(id);
      navigate("/dna");
    } finally {
      setLoading(false);
    }
  }

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
      {/* HEADER (sem Voltar, sem Criar DNA) */}
      <PageHeader
        title={isNew ? "Criar DNA" : "Editar DNA"}
        subtitle="Cadastro do grupo DNA"
      />

      {/* FORMULÁRIO */}
      <section
        className="
          bg-base-100
          rounded-2xl
        "
      >
        <DnaForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/dna")}
          isSubmitting={loading}
        />
      </section>

      {/* AÇÃO PERIGOSA (DISCRETA) */}
      {!isNew && (
        <div className="pt-2 flex justify-end">
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={loading}
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
            Excluir DNA
          </Button>
        </div>
      )}
    </div>
  );
}
