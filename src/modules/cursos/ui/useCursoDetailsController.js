import { useMemo } from "react";
import { useParams } from "react-router-dom";

import useCursos from "../hooks/useCursos";
import useAuth from "@/modules/auth/hooks/useAuth";

import {
  canEditCurso,
} from "../domain/policies/cursoPermissions";

export default function useCursoDetailsController() {
  const { id } = useParams();
  const { cursos, loading } = useCursos();
  const { user } = useAuth();

  const curso = useMemo(
    () => cursos.find((c) => c.id === id),
    [cursos, id]
  );

  const permissions = useMemo(
    () => ({
      canEdit: canEditCurso(user),
    }),
    [user]
  );

  return {
    curso,
    loading,
    permissions,
  };
}
