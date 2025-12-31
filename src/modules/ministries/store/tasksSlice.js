import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksService";

// =======================================
// NORMALIZAÇÃO PADRÃO (SEGURA)
// =======================================
function normalize(ministry) {
  return String(ministry || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// =======================================
// ESTADO INICIAL
// =======================================
const initialState = {
  audio: [],
  kids: [],
  louvor: [],
  zelo: [],
  intercessao: [],
  midia: [],
  loading: false,
  error: null,
};

// =======================================
// BUSCAR TAREFAS
// =======================================
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (ministry) => {
    const key = normalize(ministry);
    const data = await getTasks(key);
    return { ministry: key, data: Array.isArray(data) ? data : [] };
  }
);

// =======================================
// CRIAR TAREFA
// =======================================
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ ministry, data }) => {
    const key = normalize(ministry);
    const created = await createTask(key, data);
    return { ministry: key, created };
  }
);

// =======================================
// EDITAR TAREFA
// =======================================
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ ministry, id, data }) => {
    const key = normalize(ministry);
    const updated = await updateTask(key, id, data);
    return { ministry: key, updated };
  }
);

// =======================================
// REMOVER TAREFA
// =======================================
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async ({ ministry, id }) => {
    const key = normalize(ministry);
    await deleteTask(key, id);
    return { ministry: key, id };
  }
);

// =======================================
// SLICE
// =======================================
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ===== FETCH =====
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { ministry, data } = action.payload;
        state[ministry] = data;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message || "Erro ao carregar tarefas";
      })

      // ===== ADD =====
      .addCase(addTask.fulfilled, (state, action) => {
        const { ministry, created } = action.payload;

        if (!Array.isArray(state[ministry])) {
          state[ministry] = [];
        }

        state[ministry].push(created);
      })

      // ===== EDIT =====
      .addCase(editTask.fulfilled, (state, action) => {
        const { ministry, updated } = action.payload;

        if (!Array.isArray(state[ministry])) return;

        state[ministry] = state[ministry].map((t) =>
          t.id === updated.id ? { ...t, ...updated } : t
        );
      })

      // ===== REMOVE =====
      .addCase(removeTask.fulfilled, (state, action) => {
        const { ministry, id } = action.payload;

        if (!Array.isArray(state[ministry])) return;

        state[ministry] = state[ministry].filter(
          (t) => t.id !== id
        );
      });
  },
});

export default tasksSlice.reducer;
