import { useState, useMemo } from "react";

import useCursosController from "../ui/useCursosController";

import PageHeader from "@/components/ui/PageHeader";
import CursoForm from "../components/CursoForm";
import CursoCard from "../components/CursoCard";
import CursoSearch from "../components/CursoSearch";
import Button from "@/components/ui/Button";

export default function CursosList() {
  const {
    cursos,
    loading,
    permissions,
    saveCurso,
    deleteCurso,
  } = useCursosController();

  const [editingCurso, setEditingCurso] = useState(null);
  const [search, setSearch] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setEditingCurso((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!editingCurso?.title) return;

    try {
      await saveCurso(editingCurso);
      setEditingCurso(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete() {
    if (!editingCurso?.id) return;
    if (!permissions.canDelete) return;

    const ok = window.confirm(
      "Tem certeza que deseja EXCLUIR este curso definitivamente?"
    );
    if (!ok) return;

    try {
      await deleteCurso(editingCurso.id);
      setEditingCurso(null);
    } catch (error) {
      alert(error.message);
    }
  }

  const filteredCursos = useMemo(() => {
    if (!Array.isArray(cursos)) return [];

    const term = search.trim().toLowerCase();

    return cursos.filter((curso) =>
      !term
        ? true
        : curso.title?.toLowerCase().includes(term) ||
          curso.description?.toLowerCase().includes(term)
    );
  }, [cursos, search]);

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-6">
      <PageHeader
        title="Cursos e Treinamentos"
        subtitle="Módulos de ensino organizados por tema"
        align="center"
      />

      {permissions.canCreate && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() =>
              setEditingCurso({ title: "", description: "" })
            }
          >
            Novo curso
          </Button>
        </div>
      )}

      <CursoSearch
        value={search}
        onChange={setSearch}
        placeholder="Buscar por curso ou tema"
      />

      {loading ? (
        <p className="text-sm text-base-content/60 text-center">
          Carregando cursos…
        </p>
      ) : filteredCursos.length === 0 ? (
        <p className="text-sm text-base-content/60 text-center">
          Nenhum curso encontrado.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredCursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              canEdit={permissions.canEdit}
              onEdit={setEditingCurso}
            />
          ))}
        </div>
      )}

      {editingCurso && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-3">
          <div className="w-full max-w-lg">
            <CursoForm
              values={editingCurso}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={() => setEditingCurso(null)}
              onDelete={editingCurso.id ? handleDelete : undefined}
              canDelete={permissions.canDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
