import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import useCursos from "../hooks/useCursos";
import { courseService } from "../application/courseService";
import { fetchCursosThunk } from "../store/cursosThunks";

import {
  canCreateCurso,
  canEditCurso,
  canDeleteCurso,
} from "../domain/policies/cursoPermissions";

import useAuth from "@/modules/auth/hooks/useAuth";

function isValidId(id) {
  return typeof id === "string" && id.trim().length > 0;
}

export default function useCursoEditorController() {
  const { id } = useParams();

  // ✅ BLINDAGEM CORRETA
  const editing = isValidId(id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuth();
  const { getCursoById, loading } = useCursos();

  const permissions = useMemo(() => {
    const canCreate = canCreateCurso(user);
    const canEdit = canEditCurso(user);
    const canDelete = canDeleteCurso(user);

    const canAccess = editing ? canEdit : canCreate;

    return { canCreate, canEdit, canDelete, canAccess };
  }, [user, editing]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!editing) return;

    const curso = getCursoById(id);
    if (!curso) return;

    setForm({
      title: curso.title ?? "",
      description: curso.description ?? "",
    });
  }, [editing, id, getCursoById]);

  function changeField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submit() {
    if (!form.title) return;

    if (editing) {
      await courseService.updateCourse({
        id,
        title: form.title,
        description: form.description,
      });
    } else {
      await courseService.createCourse({
        title: form.title,
        description: form.description,
      });
    }

    dispatch(fetchCursosThunk());
    navigate("/cursos");
  }

  async function remove() {
    if (!editing) return;
    if (!permissions.canDelete) return;

    const ok = window.confirm(
      "Tem certeza que deseja EXCLUIR este curso definitivamente? Essa ação não pode ser desfeita."
    );
    if (!ok) return;

    await courseService.deleteCourse(id);

    dispatch(fetchCursosThunk());
    navigate("/cursos");
  }

  function cancel() {
    navigate(-1);
  }

  return {
    editing,
    id,
    loading,
    permissions,
    form,
    changeField,
    submit,
    remove,
    cancel,
  };
}
