import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDailyVerse } from "../services/verseApi";

export const fetchDailyVerse = createAsyncThunk(
  "home/fetchDailyVerse",
  async (_, { rejectWithValue }) => {
    try {
      const verse = await getDailyVerse();
      return verse;
    } catch (error) {
      return rejectWithValue(error?.message || "Erro ao buscar versículo");
    }
  }
);
