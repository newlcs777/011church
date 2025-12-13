import { configureStore } from "@reduxjs/toolkit";

import membersReducer from "../modules/ministries/store/membersSlice";
import tasksReducer from "../modules/ministries/store/tasksSlice";
import scheduleReducer from "../modules/ministries/store/scheduleSlice";

export const store = configureStore({
  reducer: {
    members: membersReducer,
    tasks: tasksReducer,
    schedule: scheduleReducer,
  },
});

export default store;
