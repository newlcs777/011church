import { createSlice } from "@reduxjs/toolkit";
import { fetchDailyVerse } from "./homeThunks";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    verse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyVerse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyVerse.fulfilled, (state, action) => {
        state.verse = action.payload;
        state.loading = false;
      })
      .addCase(fetchDailyVerse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
