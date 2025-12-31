import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔐 ENV
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = import.meta.env;

// ✅ Validação mínima (evita inicializar Firebase com undefined)
const missing = [
  ["VITE_FIREBASE_API_KEY", VITE_FIREBASE_API_KEY],
  ["VITE_FIREBASE_AUTH_DOMAIN", VITE_FIREBASE_AUTH_DOMAIN],
  ["VITE_FIREBASE_PROJECT_ID", VITE_FIREBASE_PROJECT_ID],
  ["VITE_FIREBASE_STORAGE_BUCKET", VITE_FIREBASE_STORAGE_BUCKET],
  ["VITE_FIREBASE_MESSAGING_SENDER_ID", VITE_FIREBASE_MESSAGING_SENDER_ID],
  ["VITE_FIREBASE_APP_ID", VITE_FIREBASE_APP_ID],
].filter(([, v]) => !v);

if (missing.length) {
  throw new Error(
    `Firebase ENV faltando: ${missing.map(([k]) => k).join(", ")}`
  );
}

// 🔐 CONFIG VIA ENV (VITE)
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

// 🔥 INIT
const app = initializeApp(firebaseConfig);

// 🔥 SERVIÇOS
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// 🧪 DEBUG CONTROLADO (DEV ONLY)
if (import.meta.env.DEV && typeof window !== "undefined") {
  window.firebase = {
    db,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
  };

  console.log("🔥 Firebase conectado corretamente (DEV)");
}

export { serverTimestamp };
export default app;
