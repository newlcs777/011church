import { useMemo } from "react";
import { useDispatch } from "react-redux";

import useCursos from "../hooks/useCursos";
import { courseService } from "../application/courseService";
import { fetchCursosThunk } from "../store/cursosThunks";

import {
  canCreateCurso,
  canEditCurso,
  canDeleteCurso,
} from "../domain/policies/cursoPermissions";

import useAuth from "@/modules/auth/hooks/useAuth";

export default function useCursosController() {
  const dispatch = useDispatch();
  const { cursos, loading } = useCursos();
  const { user } = useAuth();

  const permissions = useMemo(
    () => ({
      canCreate: canCreateCurso(user),
      canEdit: canEditCurso(user),
      canDelete: canDeleteCurso(user),
    }),
    [user]
  );

  async function saveCurso(curso) {
    if (curso.id) {
      await courseService.updateCourse({
        id: curso.id,
        title: curso.title,
        description: curso.description,
      });
    } else {
      await courseService.createCourse({
        title: curso.title,
        description: curso.description,
      });
    }

    dispatch(fetchCursosThunk());
  }

  async function deleteCurso(courseId) {
    await courseService.deleteCourse(courseId);
    dispatch(fetchCursosThunk());
  }

  return {
    cursos,
    loading,
    permissions,
    saveCurso,
    deleteCurso,
  };
}
