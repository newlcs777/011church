import { createSlice } from "@reduxjs/toolkit";

const bibleSlice = createSlice({
  name: "bible",
  initialState: {
    book: null,
    chapter: null,
    verse: null,
  },
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setChapter: (state, action) => {
      state.chapter = action.payload;
      state.verse = null;
    },
    setVerse: (state, action) => {
      state.verse = action.payload;
    },
  },
});

export const { setBook, setChapter, setVerse } = bibleSlice.actions;
export default bibleSlice.reducer;
