import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAulasByCurso,
  createAula,
  updateAula,
  deleteAula,
} from "../services/aulasService";

export const fetchAulasByCurso = createAsyncThunk(
  "aulas/fetchByCurso",
  async (cursoId) => {
    return await getAulasByCurso(cursoId);
  }
);

export const addAula = createAsyncThunk(
  "aulas/add",
  async (data) => {
    return await createAula(data);
  }
);

export const editAula = createAsyncThunk(
  "aulas/edit",
  async ({ id, data }) => {
    await updateAula(id, data);
    return { id, data };
  }
);

export const removeAula = createAsyncThunk(
  "aulas/remove",
  async (id) => {
    await deleteAula(id);
    return id;
  }
);
