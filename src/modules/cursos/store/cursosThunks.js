import { createAsyncThunk } from "@reduxjs/toolkit";
import { courseService } from "../application/courseService";

/**
 * LISTAR CURSOS (LEITURA)
 */
export const fetchCursosThunk = createAsyncThunk(
  "cursos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await courseService.fetchCourses();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
