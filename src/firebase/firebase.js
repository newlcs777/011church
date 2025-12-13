import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
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

// Serviços
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Debug manual no console
if (typeof window !== "undefined") {
  window.firebase = { db, getDocs, collection };
  console.log("🔥 Firestore disponível no window");
}

export default app;
