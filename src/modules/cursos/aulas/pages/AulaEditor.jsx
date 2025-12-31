import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Navigate } from "react-router-dom";

import { addAula, editAula } from "../store/aulasThunks";
import AulaForm from "../components/AulaForm";
import PageHeader from "@/components/ui/PageHeader";
import useAuth from "@/modules/auth/hooks/useAuth";

export default function AulaEditor({ initialData = null }) {
  const { cursoId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔒 SOMENTE ADMIN
  if (user?.role !== "admin") {
    return <Navigate to={`/cursos/${cursoId}`} replace />;
  }

  const isEdit = Boolean(initialData?.id);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    videoUrl: "",
    ordem: "",
  });

  const ordemNumber = useMemo(() => {
    const n = Number(form.ordem);
    return Number.isFinite(n) ? n : 0;
  }, [form.ordem]);

  useEffect(() => {
    if (!initialData) return;

    setForm({
      titulo: initialData.titulo ?? "",
      descricao: initialData.descricao ?? "",
      videoUrl: initialData.videoUrl ?? "",
      ordem:
        initialData.ordem === 0 || initialData.ordem
          ? String(initialData.ordem)
          : "",
    });
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cursoId) return;
    if (!form.titulo.trim()) return;

    const payload = {
      cursoId,
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim(),
      videoUrl: form.videoUrl.trim(),
      ordem: ordemNumber,
    };

    if (isEdit) {
      await dispatch(
        editAula({
          id: initialData.id,
          data: payload,
        })
      );
    } else {
      await dispatch(addAula(payload));
    }

    navigate(`/cursos/${cursoId}`);
  }

  function handleDelete() {
    if (!isEdit) return;

    const ok = window.confirm(
      "Tem certeza que deseja excluir esta aula?"
    );
    if (!ok) return;

    navigate(`/cursos/${cursoId}`);
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-6">
      <PageHeader
        title={isEdit ? "Editar aula" : "Nova aula"}
        subtitle="Conteúdo de ensino do curso"
        align="center"
      />

      <AulaForm
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/cursos/${cursoId}`)}
        onDelete={handleDelete}
        canDelete={isEdit}
      />
    </div>
  );
}
