import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useCursos from "../hooks/useCursos";
import CursoForm from "../components/CursoForm";
import PageHeader from "@/components/ui/PageHeader";

export default function CursoEditor() {
  const { id } = useParams();
  const editing = Boolean(id);

  const navigate = useNavigate();
  const {
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
  } = useCursos();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    link: "",
  });

  useEffect(() => {
    if (!editing) return;

    const curso = getCursoById(id);
    if (!curso) return;

    setForm({
      titulo: curso.titulo ?? "",
      descricao: curso.descricao ?? "",
      link: curso.link ?? "",
    });
  }, [editing, id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editing) {
      updateCurso({ id, ...form });
    } else {
      createCurso(form);
    }

    navigate("/cursos");
  }

  function handleDelete() {
    if (!editing) return;

    const ok = window.confirm(
      "Tem certeza que deseja excluir esta aula? Essa ação não pode ser desfeita."
    );
    if (!ok) return;

    deleteCurso(id);
    navigate("/cursos");
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        md:gap-6
        pb-6
      "
    >
      {/* HEADER */}
      <PageHeader
        title={editing ? "Editar aula" : "Nova aula"}
        subtitle={
          editing
            ? "Atualize o conteúdo desta aula para a igreja"
            : "Cadastre uma nova aula para edificação"
        }
        align="center"
      />

      {/* FORM — TODA A UI ESTÁ AQUI */}
      <CursoForm
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        onDelete={handleDelete}
        canDelete={editing}
      />
    </div>
  );
}
