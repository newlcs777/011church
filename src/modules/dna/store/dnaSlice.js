import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDnas,
  getDnaById,
  createDna,
  updateDna,
  deleteDna,
} from "../services/dnaService";

/* ===================== THUNKS ===================== */

export const fetchDnas = createAsyncThunk(
  "dna/fetchDnas",
  async () => {
    const data = await getDnas();
    return data;
  }
);

export const fetchDnaById = createAsyncThunk(
  "dna/fetchDnaById",
  async (id) => {
    const dna = await getDnaById(id);
    return dna; // pode ser null
  }
);

export const createDnaThunk = createAsyncThunk(
  "dna/createDna",
  async (payload) => {
    const created = await createDna(payload);
    return created;
  }
);

export const updateDnaThunk = createAsyncThunk(
  "dna/updateDna",
  async ({ id, data }) => {
    await updateDna(id, data);
    return { id, data };
  }
);

export const deleteDnaThunk = createAsyncThunk(
  "dna/deleteDna",
  async (id) => {
    await deleteDna(id);
    return id;
  }
);

/* ===================== SLICE ===================== */

const dnaSlice = createSlice({
  name: "dna",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchDnas
      .addCase(fetchDnas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDnas.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchDnas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Erro ao carregar DNAs";
      })

      // create
      .addCase(createDnaThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // update
      .addCase(updateDnaThunk.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.items = state.items.map((dna) =>
          dna.id === id ? { ...dna, ...data } : dna
        );
      })

      // delete
      .addCase(deleteDnaThunk.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((dna) => dna.id !== id);
      });
  },
});

export default dnaSlice.reducer;

/* ===================== SELECTORS ===================== */

export const selectDnas = (state) => state.dna.items;
export const selectDnaLoading = (state) => state.dna.loading;
export const selectDnaError = (state) => state.dna.error;
