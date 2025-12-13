import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import AppLayout from "./layout/AppLayout";

// IMPORTAÇÃO CORRETA → APENAS EXECUTA O FIREBASE.JS
import "./firebase/firebase"




export default function App() {
  return (
    <AuthProvider>
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-secondary
          via-neutral
          to-base-300
          text-base-content
        "
      >
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </div>
    </AuthProvider>
  );
}
