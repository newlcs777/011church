import { configureStore } from "@reduxjs/toolkit";

import membersReducer from "../modules/ministries/store/membersSlice";
import tasksReducer from "../modules/ministries/store/tasksSlice";
import scheduleReducer from "../modules/ministries/store/scheduleSlice";
import homeReducer from "../modules/home/store/homeSlice";

import eventsReducer from "../modules/events/store/eventsSlice";
import comunicadosReducer from "../modules/comunicados/store/comunicadosSlice";
import cursosReducer from "../modules/cursos/store/cursosSlice";
import dnaReducer from "../modules/dna/store/dnaSlice";
import peopleReducer from "../modules/people/store/peopleSlice";

export const store = configureStore({
  reducer: {
    members: membersReducer,
    tasks: tasksReducer,
    schedule: scheduleReducer,
    home: homeReducer,

    events: eventsReducer,
    comunicados: comunicadosReducer,
    cursos: cursosReducer,
    dna: dnaReducer,
    people: peopleReducer,
  },

  // 🔥 CORREÇÃO DO ERRO DE SERIALIZAÇÃO (Firestore)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "cursos/create/fulfilled",
          "cursos/update/fulfilled",
        ],
        ignoredPaths: [
          "cursos.items",
        ],
      },
    }),
});

export default store;
