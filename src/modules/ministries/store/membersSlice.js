import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../services/membersService";

// ======================================================
// FUNÇÃO DE NORMALIZAÇÃO — SEGURA PARA TODOS MINISTÉRIOS
// ======================================================
function normalize(ministry) {
  return ministry
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos
}

// ======================================================
// ESTADO INICIAL — ESCALÁVEL
// ======================================================
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

// ======================================================
// BUSCAR MEMBROS
// ======================================================
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async (ministry) => {
    const normalized = normalize(ministry);
    const data = await getMembers(normalized);
    return { ministry: normalized, data };
  }
);

// ======================================================
// CRIAR MEMBRO
// ======================================================
export const addMember = createAsyncThunk(
  "members/addMember",
  async ({ ministry, data }) => {
    const normalized = normalize(ministry);
    const created = await createMember(normalized, data);
    return { ministry: normalized, created };
  }
);

// ======================================================
// EDITAR MEMBRO
// ======================================================
export const editMember = createAsyncThunk(
  "members/editMember",
  async ({ ministry, id, data }) => {
    const normalized = normalize(ministry);
    const updated = await updateMember(normalized, id, data);
    return { ministry: normalized, updated };
  }
);

// ======================================================
// REMOVER MEMBRO
// ======================================================
export const removeMember = createAsyncThunk(
  "members/removeMember",
  async ({ ministry, id }) => {
    const normalized = normalize(ministry);
    await deleteMember(normalized, id);
    return { ministry: normalized, id };
  }
);

// ======================================================
// SLICE REDUX — CORRIGIDO E ROBUSTO
// ======================================================
const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // =========================
    // FETCH MEMBERS
    // =========================
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMembers.fulfilled, (state, action) => {
        const { ministry, data } = action.payload;
        state[ministry] = data;
        state.loading = false;
      })

      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // =========================
// ADD MEMBER
// =========================
builder.addCase(addMember.fulfilled, (state, action) => {
  const { ministry, created } = action.payload;

  if (!state[ministry]) {
    state[ministry] = [];
  }

  state[ministry].push(created);
});


    // =========================
    // UPDATE MEMBER
    // =========================
    builder.addCase(editMember.fulfilled, (state, action) => {
      const { ministry, updated } = action.payload;
      state[ministry] = state[ministry].map((m) =>
        m.id === updated.id ? { ...m, ...updated } : m
      );
    });

    // =========================
    // DELETE MEMBER
    // =========================
    builder.addCase(removeMember.fulfilled, (state, action) => {
      const { ministry, id } = action.payload;
      state[ministry] = state[ministry].filter((m) => m.id !== id);
    });
  },
});

export default membersSlice.reducer;
