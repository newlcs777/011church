import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const { getById, create, update, remove } = useDna(); // ✅ remove
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
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este DNA?"
    );

    if (!confirm) return;

    setLoading(true);

    try {
      await remove(id); // ✅ AGORA EXCLUI DE VERDADE (soft delete)
      navigate("/dna");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <PageHeader
        title={isNew ? "Criar DNA" : "Editar DNA"}
        subtitle="Cadastro do grupo DNA"
      />

      <DnaForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/dna")}
        isSubmitting={loading}
      />

      {!isNew && (
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
        >
          Excluir DNA
        </Button>
      )}
    </div>
  );
}
