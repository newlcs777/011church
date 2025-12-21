import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPeople,
  createPerson,
  updatePerson as updateService,
  deletePerson as deleteService,
} from "../services/peopleService";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async () => {
    return await getPeople();
  }
);

export const addPerson = createAsyncThunk(
  "people/addPerson",
  async (data) => {
    return await createPerson(data);
  }
);

export const updatePerson = createAsyncThunk(
  "people/updatePerson",
  async ({ id, data }) => {
    await updateService(id, data);
    return { id, data };
  }
);

export const deletePerson = createAsyncThunk(
  "people/deletePerson",
  async (id) => {
    await deleteService(id);
    return id;
  }
);
