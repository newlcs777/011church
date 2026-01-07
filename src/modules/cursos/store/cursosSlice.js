import { createSlice } from "@reduxjs/toolkit";
import { fetchCursosThunk } from "./cursosThunks";

const cursosSlice = createSlice({
  name: "cursos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCursosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCursosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCursosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cursosSlice.reducer;
