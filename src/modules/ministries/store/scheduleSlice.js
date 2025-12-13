import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSchedulesByMonth,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../services/scheduleService";

// =======================================
// NORMALIZAÇÃO DE MINISTÉRIO
// =======================================
function normalize(ministry) {
  return ministry
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// =======================================
// ESTADO INICIAL (🔥 CORREÇÃO)
// =======================================
const initialState = {
  items: [],
  currentMonth: new Date().toISOString().slice(0, 7), // ✅ EX: 2025-12
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
    return data; // ✅ só os dados
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
    // FETCH
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.items = action.payload; // ✅ direto
        state.loading = false;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
