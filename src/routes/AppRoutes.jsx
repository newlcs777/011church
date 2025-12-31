import { Routes, Route, Navigate } from "react-router-dom";
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

/* ===================== CURSOS ===================== */
import CursosList from "../modules/cursos/pages/CursosList";
import CursoDetails from "../modules/cursos/pages/CursoDetails";
import CursoEditor from "../modules/cursos/pages/CursoEditor";

/* ===================== AULAS ===================== */
import AulaEditor from "../modules/cursos/aulas/pages/AulaEditor";

/* ===================== MANUTENÇÃO ===================== */
import MaintenancePage from "@/components/system/MaintenancePage";

/* ===================== DNA ===================== */
import DnaListPage from "@/modules/dna/pages/DnaListPage";
import DnaEditorPage from "../modules/dna/pages/DnaEditorPage";
import DnaDetailsPage from "../modules/dna/pages/DnaDetailsPage";

/* ===================== PEOPLE ===================== */
import PeopleCreatePage from "@/modules/people/pages/PeopleCreatePage";
import PeopleListPage from "@/modules/people/pages/PeopleListPage";
import PeopleByDnaPage from "@/modules/people/pages/PeopleByDnaPage";

/* ===================== ADMIN ===================== */
import AdminDashboard from "../modules/admin/pages/AdminDashboard";

/* ===================== MEMBERS GLOBAL ===================== */
import MembersListPage from "../modules/members/pages/MembersListPage";
import MemberCreatePage from "../modules/members/pages/MemberCreatePage";
import MemberEditPage from "../modules/members/pages/MemberEditPage";

/* ===================== MINISTÉRIO: ÁUDIO ===================== */
import AudioPage from "../modules/ministries/audio/pages/AudioPage.jsx";
import AudioMembersList from "../modules/ministries/audio/members/AudioMembersList.jsx";
import AudioMembersEdit from "../modules/ministries/audio/members/AudioMemberEdit.jsx";
import AudioMemberLink from "../modules/ministries/audio/members/AudioMemberLink.jsx";

/* TASKS */
import AudioTasksList from "../modules/ministries/audio/tasks/List.jsx";
import AudioTaskCreate from "../modules/ministries/audio/tasks/Create.jsx";
import AudioTaskEdit from "../modules/ministries/audio/tasks/Edit.jsx";

/* ===================== ESCALA ===================== */
import AudioSchedulePage from "../modules/ministries/audio/pages/AudioSchedulePage.jsx";
import AudioScheduleCreate from "../modules/ministries/audio/schedule/AudioScheduleCreate.jsx";
import AudioScheduleEdit from "../modules/ministries/audio/schedule/AudioScheduleEdit.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* HOME */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* MEMBERS */}
      <Route
        path="/members"
        element={
          <ProtectedRoute>
            <MembersListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members/create"
        element={
          <ProtectedRoute>
            <MemberCreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members/edit/:id"
        element={
          <ProtectedRoute>
            <MemberEditPage />
          </ProtectedRoute>
        }
      />

      {/* BÍBLIA */}
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

      {/* EVENTOS */}
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

      {/* COMUNICADOS */}
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
        path="/comunicados/:id/editar"
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

      {/* ===================== CURSOS ===================== */}
      <Route
        path="/cursos"
        element={
          <ProtectedRoute>
            <CursosList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cursos/novo"
        element={
          <ProtectedRoute>
            <CursoEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cursos/:id"
        element={
          <ProtectedRoute>
            <CursoDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cursos/editar/:id"
        element={
          <ProtectedRoute>
            <CursoEditor />
          </ProtectedRoute>
        }
      />

      {/* ===================== AULAS (DENTRO DO CURSO) ===================== */}
      <Route
        path="/cursos/:cursoId/aulas/nova"
        element={
          <ProtectedRoute>
            <AulaEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cursos/:cursoId/aulas/:aulaId/editar"
        element={
          <ProtectedRoute>
            <AulaEditor />
          </ProtectedRoute>
        }
      />

      {/* DNA */}
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

      {/* PEOPLE */}
      <Route
        path="/people"
        element={
          <ProtectedRoute>
            <PeopleListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/people/create"
        element={
          <ProtectedRoute>
            <PeopleCreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/people/meu-dna"
        element={
          <ProtectedRoute>
            <PeopleByDnaPage />
          </ProtectedRoute>
        }
      />

      {/* MINISTÉRIO ÁUDIO */}
      <Route
        path="/ministerios/audio"
        element={
          <ProtectedRoute>
            <AudioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ministerios/audio/members"
        element={
          <ProtectedRoute>
            <AudioMembersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ministerios/audio/members/link"
        element={
          <ProtectedRoute>
            <AudioMemberLink />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ministerios/audio/members/create"
        element={
          <ProtectedRoute>
            <Navigate
              to="/ministerios/audio/members/link"
              replace
            />
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

      {/* ESCALA */}
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

      {/* MINISTÉRIOS EM MANUTENÇÃO */}
      {[
        "presbiterio",
        "louvor",
        "impacto",
        "intercessao",
        "zelo",
        "guardiao",
        "boas-vindas",
        "boasvindas",
        "kids",
        "diaconia",
        "base",
      ].map((slug) => (
        <Route
          key={slug}
          path={`/ministerios/${slug}`}
          element={
            <ProtectedRoute>
              <MaintenancePage
                title="Ministério em preparação"
                message="Estamos organizando este espaço com excelência."
              />
            </ProtectedRoute>
          }
        />
      ))}

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🔁 FALLBACK FINAL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
