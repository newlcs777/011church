import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCursosThunk,
  createCursoThunk,
  updateCursoThunk,
  deleteCursoThunk,
} from "./cursosThunks";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * 🔒 Normaliza curso (REMOVE Timestamp / lixo do Firestore)
 */
function normalizeCurso(curso) {
  if (!curso) return curso;

  return {
    id: curso.id,
    titulo: curso.titulo ?? "",
    descricao: curso.descricao ?? "",
    link: curso.link ?? "",
    ordem:
      typeof curso.ordem === "number"
        ? curso.ordem
        : Number(curso.ordem) || null,
  };
}

const cursosSlice = createSlice({
  name: "cursos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ========================
         FETCH
      ======================== */
      .addCase(fetchCursosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCursosThunk.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ NORMALIZA TUDO AQUI
        state.items = Array.isArray(action.payload)
          ? action.payload.map(normalizeCurso)
          : [];
      })
      .addCase(fetchCursosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Erro ao carregar cursos";
      })

      /* ========================
         CREATE
      ======================== */
      .addCase(createCursoThunk.fulfilled, (state, action) => {
        const novo = normalizeCurso(action.payload);

        // 🔒 evita duplicado
        const exists = state.items.some(
          (c) => c.id === novo.id
        );

        if (!exists) {
          state.items.push(novo);
        }
      })

      /* ========================
         UPDATE
      ======================== */
      .addCase(updateCursoThunk.fulfilled, (state, action) => {
        const updated = normalizeCurso(action.payload);

        const index = state.items.findIndex(
          (curso) => curso.id === updated.id
        );

        if (index !== -1) {
          state.items[index] = updated;
        }
      })

      /* ========================
         DELETE
      ======================== */
      .addCase(deleteCursoThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (curso) => curso.id !== action.payload
        );
      });
  },
});

export default cursosSlice.reducer;
