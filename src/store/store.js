import { configureStore } from "@reduxjs/toolkit";

import membersReducer from "../modules/ministries/store/membersSlice";
import tasksReducer from "../modules/ministries/store/tasksSlice";
import scheduleReducer from "../modules/ministries/store/scheduleSlice";
import homeReducer from "../modules/home/store/homeSlice";
import eventsReducer from "../modules/events/store/eventsSlice"; // ✅ ADD
import dnaReducer from "../modules/dna/store/dnaSlice"; // ✅ ADD
import peopleReducer from "../modules/people/store/peopleSlice"; // ✅ ADD

export const store = configureStore({
  reducer: {
    members: membersReducer,
    tasks: tasksReducer,
    schedule: scheduleReducer,
    home: homeReducer,
    events: eventsReducer, // ✅ ADD
    dna: dnaReducer, // ✅ ADD
    people: peopleReducer, // ✅ ADD
  },
});

export default store;
