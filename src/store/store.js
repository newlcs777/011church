import { configureStore } from "@reduxjs/toolkit";

// 🔹 LEGADO (membros por ministério – manter por enquanto)
import membersReducer from "../modules/ministries/store/membersSlice";

// 🔹 NOVO – CADASTRO ÚNICO GLOBAL DE MEMBROS
import membersGlobalReducer from "../modules/members/store/membersSlice";

import tasksReducer from "../modules/ministries/store/tasksSlice";
import scheduleReducer from "../modules/ministries/store/scheduleSlice";
import homeReducer from "../modules/home/store/homeSlice";

import eventsReducer from "../modules/events/store/eventsSlice";
import comunicadosReducer from "../modules/comunicados/store/comunicadosSlice";
import cursosReducer from "../modules/cursos/store/cursosSlice";
import dnaReducer from "../modules/dna/store/dnaSlice";
import peopleReducer from "../modules/people/store/peopleSlice";

// ✅ AULAS (NOVO — ESSENCIAL)
import aulasReducer from "../modules/cursos/aulas/store/aulasSlice";

export const store = configureStore({
  reducer: {
    // ⚠️ LEGADO
    members: membersReducer,

    // ✅ FONTE DA VERDADE
    membersGlobal: membersGlobalReducer,

    tasks: tasksReducer,
    schedule: scheduleReducer,
    home: homeReducer,

    events: eventsReducer,
    comunicados: comunicadosReducer,
    cursos: cursosReducer,

    // ✅ AULAS
    aulas: aulasReducer,

    dna: dnaReducer,
    people: peopleReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          // 🔥 LEGADO
          "members",
          "members.items",

          // 🔹 NOVO
          "membersGlobal",
          "membersGlobal.items",
          "membersGlobal.byMinistry",

          // 🔹 OUTROS
          "schedule.items",
          "cursos.items",

          // ✅ AULAS
          "aulas.items",
        ],

        ignoredActions: [
          // LEGADO
          "members/fetchMembers/fulfilled",
          "members/addMember/fulfilled",
          "members/updateMember/fulfilled",

          // GLOBAL
          "membersGlobal/fetchMembers/fulfilled",
          "membersGlobal/fetchMembersByMinistry/fulfilled",
          "membersGlobal/addMemberToMinistry/fulfilled",

          // SCHEDULE
          "schedule/fetchSchedules/fulfilled",
          "schedule/addSchedule/fulfilled",
          "schedule/editSchedule/fulfilled",

          // CURSOS
          "cursos/create/fulfilled",
          "cursos/update/fulfilled",
        ],
      },
    }),
});

export default store;
