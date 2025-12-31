import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAulasByCurso,
  addAula,
  editAula,
  removeAula,
} from "./aulasThunks";

const aulasSlice = createSlice({
  name: "aulas",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    clearAulas(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAulasByCurso.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAulasByCurso.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addAula.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editAula.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(removeAula.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (a) => a.id !== action.payload
        );
      });
  },
});

export const { clearAulas } = aulasSlice.actions;
export default aulasSlice.reducer;
