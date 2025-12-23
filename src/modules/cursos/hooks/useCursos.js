import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCursosThunk,
  createCursoThunk,
  updateCursoThunk,
  deleteCursoThunk,
} from "../store/cursosThunks";

export default function useCursos() {
  const dispatch = useDispatch();

  const {
    items = [],
    loading = false,
  } = useSelector((state) => state.cursos || {});

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    dispatch(fetchCursosThunk());
  }, [dispatch]);

  /* =========================
     GET BY ID
  ========================= */
  function getCursoById(id) {
    if (!id) return null;
    return items.find((curso) => curso.id === id) || null;
  }

  /* =========================
     CREATE
  ========================= */
  function createCurso(data) {
    return dispatch(createCursoThunk(data));
  }

  /* =========================
     UPDATE
  ========================= */
  function updateCurso(data) {
    if (!data?.id) return;
    return dispatch(updateCursoThunk(data));
  }

  /* =========================
     DELETE
  ========================= */
  function deleteCurso(id) {
    if (!id) return;
    return dispatch(deleteCursoThunk(id));
  }

  return {
    cursos: items,
    loading,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
  };
}
