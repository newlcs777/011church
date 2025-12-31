import { useState, useMemo } from "react";

import useCursos from "../hooks/useCursos";
import PageHeader from "@/components/ui/PageHeader";
import CursoForm from "../components/CursoForm";
import CursoCard from "../components/CursoCard";
import CursoSearch from "../components/CursoSearch";
import useAuth from "@/modules/auth/hooks/useAuth";

export default function CursosList() {
  const { cursos, loading, updateCurso, deleteCurso } = useCursos();
  const { user } = useAuth();

  const canEdit =
    user?.role === "admin" || user?.role === "lider";

  const [editingCurso, setEditingCurso] = useState(null);
  const [search, setSearch] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setEditingCurso((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateCurso({
      ...editingCurso,
      ordem: Number(editingCurso.ordem),
    });

    setEditingCurso(null);
  }

  function handleDelete() {
    const ok = window.confirm(
      "Tem certeza que deseja excluir este curso? Todas as aulas vinculadas a ele também serão removidas."
    );
    if (!ok) return;

    deleteCurso(editingCurso.id);
    setEditingCurso(null);
  }

  /**
   * 🔍 FILTRO + ORDENAÇÃO
   * Busca por número, título e descrição do curso
   */
  const filteredCursos = useMemo(() => {
    if (!Array.isArray(cursos)) return [];

    const term = search.trim().toLowerCase();

    return [...cursos]
      .filter((curso) => {
        if (!term) return true;

        return (
          String(curso.ordem ?? "").includes(term) ||
          curso.titulo?.toLowerCase().includes(term) ||
          curso.descricao?.toLowerCase().includes(term)
        );
      })
      .sort(
        (a, b) =>
          (a.ordem ?? Number.MAX_SAFE_INTEGER) -
          (b.ordem ?? Number.MAX_SAFE_INTEGER)
      );
  }, [cursos, search]);

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-6">
      <PageHeader
        title="Cursos e Treinamentos"
        subtitle="Módulos de ensino organizados por tema"
        align="center"
      />

      {/* 🔍 BUSCA */}
      <CursoSearch
        value={search}
        onChange={setSearch}
        placeholder="Buscar por curso, tema ou número"
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
              canEdit={canEdit}
              onEdit={setEditingCurso}
            />
          ))}
        </div>
      )}

      {/* MODAL DE EDIÇÃO DO CURSO */}
      {editingCurso && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-3">
          <div className="w-full max-w-lg">
            <CursoForm
              values={editingCurso}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={() => setEditingCurso(null)}
              onDelete={handleDelete}
              canDelete
            />
          </div>
        </div>
      )}
    </div>
  );
}
