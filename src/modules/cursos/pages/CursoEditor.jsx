import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

import useCursos from "../hooks/useCursos";
import CursoForm from "../components/CursoForm";
import PageHeader from "@/components/ui/PageHeader";
import useAuth from "@/modules/auth/hooks/useAuth";

export default function CursoEditor() {
  const { id } = useParams();
  const editing = Boolean(id);

  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔒 SOMENTE ADMIN PODE ACESSAR
  if (user?.role !== "admin") {
    return <Navigate to="/cursos" replace />;
  }

  const {
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
  } = useCursos();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
  });

  useEffect(() => {
    if (!editing) return;

    const curso = getCursoById(id);
    if (!curso) return;

    setForm({
      titulo: curso.titulo ?? "",
      descricao: curso.descricao ?? "",
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
      "Tem certeza que deseja excluir este curso? Todas as aulas vinculadas a ele também serão removidas."
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
        title={editing ? "Editar curso" : "Novo curso"}
        subtitle={
          editing
            ? "Atualize as informações deste curso"
            : "Cadastre um novo curso para organização do ensino"
        }
        align="center"
      />

      {/* FORM */}
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
