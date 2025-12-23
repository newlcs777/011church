import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCursosService,
  createCursoService,
  updateCursoService,
  deleteCursoService,
} from "../services/cursosService";

/**
 * 🔄 NORMALIZA CURSO (REMOVE TIMESTAMP)
 */
function normalizeCurso(curso) {
  if (!curso) return null;

  return {
    id: curso.id,
    titulo: curso.titulo ?? "",
    descricao: curso.descricao ?? "",
    link: curso.link ?? "",
    ordem: curso.ordem ?? null,

    // 🔥 GARANTE SERIALIZAÇÃO
    createdAt: curso.createdAt?.seconds
      ? curso.createdAt.seconds * 1000
      : curso.createdAt ?? null,

    updatedAt: curso.updatedAt?.seconds
      ? curso.updatedAt.seconds * 1000
      : curso.updatedAt ?? null,
  };
}

/**
 * 📚 LISTAR CURSOS
 */
export const fetchCursosThunk = createAsyncThunk(
  "cursos/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const cursos = await fetchCursosService();
      return cursos.map(normalizeCurso);
    } catch (err) {
      return rejectWithValue(
        err?.message || "Erro ao carregar cursos"
      );
    }
  }
);

/**
 * ➕ CRIAR CURSO
 */
export const createCursoThunk = createAsyncThunk(
  "cursos/create",
  async (data, { rejectWithValue }) => {
    try {
      const curso = await createCursoService(data);
      return normalizeCurso(curso);
    } catch (err) {
      return rejectWithValue(
        err?.message || "Erro ao criar curso"
      );
    }
  }
);

/**
 * ✏️ ATUALIZAR CURSO
 */
export const updateCursoThunk = createAsyncThunk(
  "cursos/update",
  async (data, { rejectWithValue }) => {
    try {
      const curso = await updateCursoService(data);
      return normalizeCurso(curso);
    } catch (err) {
      return rejectWithValue(
        err?.message || "Erro ao atualizar curso"
      );
    }
  }
);

/**
 * 🗑 DELETAR CURSO
 */
export const deleteCursoThunk = createAsyncThunk(
  "cursos/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCursoService(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err?.message || "Erro ao deletar curso"
      );
    }
  }
);
