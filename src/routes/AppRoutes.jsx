import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../modules/auth/components/ProtectedRoute";

/* ===================== LOGIN ===================== */
import Login from "../modules/auth/pages/Login";

/* ===================== PÁGINAS PRINCIPAIS ===================== */
import HomePage from "../modules/home/pages/HomePage";
import BiblePage from "../modules/bible/pages/BiblePage";
import BibleReadPage from "../modules/bible/pages/BibleReadPage";

/* ===================== EVENTOS ===================== */
import EventsList from "../modules/events/pages/EventsList";
import EventDetails from "../modules/events/pages/EventDetails";
import EventEditor from "../modules/events/pages/EventEditor";

/* ===================== COMUNICADOS ===================== */
import ComunicadosList from "../modules/comunicados/pages/ComunicadosList";
import ComunicadoDetails from "../modules/comunicados/pages/ComunicadoDetails";
import ComunicadoEditor from "../modules/comunicados/pages/ComunicadoEditor";

/* ===================== DNA ===================== */
import DnaListPage from "@/modules/dna/pages/DnaListPage";
import DnaEditorPage from "../modules/dna/pages/DnaEditorPage";
import DnaDetailsPage from "../modules/dna/pages/DnaDetailsPage";

/* ===================== ADMIN ===================== */
import AdminDashboard from "../modules/admin/pages/AdminDashboard";

/* ================================================================
   ===================== MINISTÉRIO: ÁUDIO =========================
   ================================================================ */

/* Página principal do ministério */
import AudioPage from "../modules/ministries/audio/pages/AudioPage.jsx";

/* MEMBERS */
import AudioMembersList from "../modules/ministries/audio/members/AudioMembersList.jsx";
import AudioMembersCreate from "../modules/ministries/audio/members/AudioMemberCreate.jsx";
import AudioMembersEdit from "../modules/ministries/audio/members/AudioMemberEdit.jsx";

/* TASKS */
import AudioTasksList from "../modules/ministries/audio/tasks/List.jsx";
import AudioTaskCreate from "../modules/ministries/audio/tasks/Create.jsx";
import AudioTaskEdit from "../modules/ministries/audio/tasks/Edit.jsx";

/* ===================== ESCALA (SCHEDULE) ===================== */
import AudioSchedulePage from "../modules/ministries/audio/pages/AudioSchedulePage.jsx";
import AudioScheduleCreate from "../modules/ministries/audio/schedule/AudioScheduleCreate.jsx";
import AudioScheduleEdit from "../modules/ministries/audio/schedule/AudioScheduleEdit.jsx";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ===================== LOGIN ===================== */}
      <Route path="/login" element={<Login />} />

      {/* ===================== HOME ===================== */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* ===================== BÍBLIA ===================== */}
      <Route
        path="/bible"
        element={
          <ProtectedRoute>
            <BiblePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bible/read"
        element={
          <ProtectedRoute>
            <BibleReadPage />
          </ProtectedRoute>
        }
      />

      {/* ===================== EVENTOS ===================== */}
      <Route
        path="/eventos"
        element={
          <ProtectedRoute>
            <EventsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/eventos/novo"
        element={
          <ProtectedRoute>
            <EventEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/eventos/editar/:id"
        element={
          <ProtectedRoute>
            <EventEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/eventos/:id"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />

      {/* ===================== COMUNICADOS ===================== */}
      <Route
        path="/comunicados"
        element={
          <ProtectedRoute>
            <ComunicadosList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comunicados/novo"
        element={
          <ProtectedRoute>
            <ComunicadoEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comunicados/editar/:id"
        element={
          <ProtectedRoute>
            <ComunicadoEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comunicados/:id"
        element={
          <ProtectedRoute>
            <ComunicadoDetails />
          </ProtectedRoute>
        }
      />
{/* ===================== DNA ===================== */}
<Route
  path="/dna"
  element={
    <ProtectedRoute>
      <DnaListPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/dna/novo"
  element={
    <ProtectedRoute>
      <DnaEditorPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/dna/editar/:id"
  element={
    <ProtectedRoute>
      <DnaEditorPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/dna/:id"
  element={
    <ProtectedRoute>
      <DnaDetailsPage />
    </ProtectedRoute>
  }
/>


      {/* ===================== MINISTÉRIO — ÁUDIO ===================== */}

      {/* Página principal */}
      <Route
        path="/ministerios/audio"
        element={
          <ProtectedRoute>
            <AudioPage />
          </ProtectedRoute>
        }
      />

      {/* MEMBERS */}
      <Route
        path="/ministerios/audio/members"
        element={
          <ProtectedRoute>
            <AudioMembersList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ministerios/audio/members/create"
        element={
          <ProtectedRoute>
            <AudioMembersCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ministerios/audio/members/edit/:id"
        element={
          <ProtectedRoute>
            <AudioMembersEdit />
          </ProtectedRoute>
        }
      />

      {/* TASKS */}
      <Route
        path="/ministerios/audio/tasks"
        element={
          <ProtectedRoute>
            <AudioTasksList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ministerios/audio/tasks/create"
        element={
          <ProtectedRoute>
            <AudioTaskCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ministerios/audio/tasks/edit/:id"
        element={
          <ProtectedRoute>
            <AudioTaskEdit />
          </ProtectedRoute>
        }
      />

      {/* ===================== ESCALA ===================== */}
      <Route
        path="/ministerios/audio/schedule"
        element={
          <ProtectedRoute>
            <AudioSchedulePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ministerios/audio/schedule/create"
        element={
          <ProtectedRoute>
            <AudioScheduleCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ministerios/audio/schedule/edit/:id"
        element={
          <ProtectedRoute>
            <AudioScheduleEdit />
          </ProtectedRoute>
        }
      />

      {/* ===================== ADMIN ===================== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
