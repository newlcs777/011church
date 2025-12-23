import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const comunicadosSlice = createSlice({
  name: "comunicados",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setComunicados(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  setLoading,
  setComunicados,
} = comunicadosSlice.actions;

export default comunicadosSlice.reducer;
