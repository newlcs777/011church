import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMembers,
  findMemberByPhone,
  createMember,
  updateMember,
  deleteMember,

  // vínculos
  getMembersByMinistry,
  linkMemberToMinistry,
  unlinkMemberFromMinistry,
} from "../services/membersService";

/* =========================
   GLOBAIS (IGREJA)
========================= */

export const fetchMembers = createAsyncThunk(
  "membersGlobal/fetchMembers",
  async () => {
    const list = await getMembers();
    return list || [];
  }
);

export const searchMemberByPhone = createAsyncThunk(
  "membersGlobal/searchMemberByPhone",
  async (phone) => {
    return await findMemberByPhone(phone);
  }
);

export const addMember = createAsyncThunk(
  "membersGlobal/addMember",
  async (data) => {
    return await createMember(data);
  }
);

export const editMember = createAsyncThunk(
  "membersGlobal/editMember",
  async ({ id, data }) => {
    return await updateMember(id, data);
  }
);

export const removeMember = createAsyncThunk(
  "membersGlobal/removeMember",
  async (id) => {
    await deleteMember(id);
    return id;
  }
);

/* =========================
   VÍNCULOS POR MINISTÉRIO
========================= */

export const fetchMembersByMinistry = createAsyncThunk(
  "membersGlobal/fetchMembersByMinistry",
  async (ministry) => {
    const members = await getMembersByMinistry(ministry);
    return { ministry, members: members || [] };
  }
);

export const addMemberToMinistry = createAsyncThunk(
  "membersGlobal/addMemberToMinistry",
  async ({ ministry, memberId }) => {
    await linkMemberToMinistry(ministry, memberId);

    // retorna dados completos para o reducer
    return { ministry, memberId };
  }
);

export const removeMemberFromMinistry = createAsyncThunk(
  "membersGlobal/removeMemberFromMinistry",
  async ({ ministry, memberId }) => {
    await unlinkMemberFromMinistry(ministry, memberId);
    return { ministry, memberId };
  }
);

/* =========================
   SLICE
========================= */

const membersSlice = createSlice({
  name: "membersGlobal",
  initialState: {
    items: [],
    found: null,
    byMinistry: {},
    loading: false,
    error: null,
  },

  reducers: {
    clearFound(state) {
      state.found = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== FETCH GLOBAL =====
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Erro ao carregar membros";
      })

      // ===== SEARCH =====
      .addCase(searchMemberByPhone.fulfilled, (state, action) => {
        state.found = action.payload || null;
      })

      // ===== ADD GLOBAL =====
      .addCase(addMember.fulfilled, (state, action) => {
        if (action.payload) state.items.unshift(action.payload);
      })

      // ===== EDIT GLOBAL =====
      .addCase(editMember.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated?.id) return;

        const idx = state.items.findIndex((m) => m.id === updated.id);
        if (idx !== -1) {
          state.items[idx] = { ...state.items[idx], ...updated };
        }
      })

      // ===== REMOVE GLOBAL =====
      .addCase(removeMember.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((m) => m.id !== id);

        Object.keys(state.byMinistry).forEach((ministry) => {
          state.byMinistry[ministry] =
            state.byMinistry[ministry]?.filter((m) => m.id !== id) || [];
        });
      })

      // ===== FETCH POR MINISTÉRIO =====
      .addCase(fetchMembersByMinistry.fulfilled, (state, action) => {
        const { ministry, members } = action.payload || {};
        state.byMinistry[ministry] = Array.isArray(members) ? members : [];
      })

      // ===== ADD NO MINISTÉRIO =====
      .addCase(addMemberToMinistry.fulfilled, (state, action) => {
        const { ministry, memberId } = action.payload || {};
        if (!ministry || !memberId) return;

        if (!Array.isArray(state.byMinistry[ministry])) {
          state.byMinistry[ministry] = [];
        }

        const exists = state.byMinistry[ministry].some(
          (m) => m.id === memberId
        );

        if (!exists) {
          const global = state.items.find((m) => m.id === memberId);
          if (global) {
            state.byMinistry[ministry].push({
              id: global.id,
              name: global.name ?? "",
              phone: global.phone ?? "",
              email: global.email ?? "",
            });
          }
        }
      })

      // ===== REMOVE DO MINISTÉRIO =====
      .addCase(removeMemberFromMinistry.fulfilled, (state, action) => {
        const { ministry, memberId } = action.payload || {};
        if (!ministry || !memberId) return;

        state.byMinistry[ministry] =
          state.byMinistry[ministry]?.filter((m) => m.id !== memberId) || [];
      });
  },
});

export const { clearFound } = membersSlice.actions;
export default membersSlice.reducer;
