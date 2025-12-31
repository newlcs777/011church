import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSchedulesByMonth,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getMembersForSchedule,
} from "../services/scheduleService";

// =======================================
// NORMALIZAÇÃO DE MINISTÉRIO (SEGURA)
// =======================================
function normalize(ministry) {
  return String(ministry || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// =======================================
// ESTADO INICIAL
// =======================================
const initialState = {
  items: [],
  members: [], // membros completos do ministério (já serializados no service)
  currentMonth: new Date().toISOString().slice(0, 7),
  loading: false,
  error: null,
};

// =======================================
// FETCH SCHEDULES
// =======================================
export const fetchSchedules = createAsyncThunk(
  "schedule/fetchSchedules",
  async ({ ministry, month }) => {
    const normalized = normalize(ministry);
    const data = await getSchedulesByMonth(normalized, month);
    return Array.isArray(data) ? data : [];
  }
);

// =======================================
// FETCH MEMBERS DO MINISTÉRIO
// =======================================
export const fetchScheduleMembers = createAsyncThunk(
  "schedule/fetchScheduleMembers",
  async (ministry) => {
    const normalized = normalize(ministry);
    const members = await getMembersForSchedule(normalized);
    return Array.isArray(members) ? members : [];
  }
);

// =======================================
// CREATE
// =======================================
export const addSchedule = createAsyncThunk(
  "schedule/addSchedule",
  async ({ ministry, data }) => {
    const normalized = normalize(ministry);
    return await createSchedule(normalized, data);
  }
);

// =======================================
// UPDATE
// =======================================
export const editSchedule = createAsyncThunk(
  "schedule/editSchedule",
  async ({ ministry, id, data }) => {
    const normalized = normalize(ministry);
    return await updateSchedule(normalized, id, data);
  }
);

// =======================================
// DELETE
// =======================================
export const removeSchedule = createAsyncThunk(
  "schedule/removeSchedule",
  async ({ ministry, id }) => {
    const normalized = normalize(ministry);
    await deleteSchedule(normalized, id);
    return id;
  }
);

// =======================================
// SLICE
// =======================================
const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setCurrentMonth(state, action) {
      state.currentMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    // FETCH SCHEDULES
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message || "Erro ao carregar escalas";
      });

    // FETCH MEMBERS DO MINISTÉRIO
    builder.addCase(fetchScheduleMembers.fulfilled, (state, action) => {
      state.members = action.payload;
    });

    // CREATE
    builder.addCase(addSchedule.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    // UPDATE
    builder.addCase(editSchedule.fulfilled, (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload }
          : item
      );
    });

    // DELETE
    builder.addCase(removeSchedule.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    });
  },
});

export const { setCurrentMonth } = scheduleSlice.actions;
export default scheduleSlice.reducer;
