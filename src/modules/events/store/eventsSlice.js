import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setEvents(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  setLoading,
  setEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
