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
  serverTimestamp, // ✅ ADD (CRÍTICO)
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAis41NNsNamWvSlYri6TEohOl7boKe9U",
  authDomain: "app-011-186ae.firebaseapp.com",
  projectId: "app-011-186ae",
  storageBucket: "app-011-186ae.appspot.com",
  messagingSenderId: "403065339870",
  appId: "1:403065339870:web:3b5bf88afb5ccd8f20274f",
  measurementId: "G-B2T934RN86",
};

const app = initializeApp(firebaseConfig);

// 🔥 SERVIÇOS
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// 🧪 DEBUG CONTROLADO (DEV)
if (typeof window !== "undefined") {
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

  console.log("🔥 Firebase conectado corretamente");
}

export { serverTimestamp };
export default app;
