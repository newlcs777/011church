import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPeople,
  addPerson,
  updatePerson,
  deletePerson,
} from "./peopleThunks";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addPerson.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updatePerson.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default peopleSlice.reducer;
