import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

// Caminho: ministries/{ministry}/schedules
function getSchedulesCollection(ministry) {
  return collection(db, "ministries", ministry, "schedules");
}

// Buscar escalas por mês (YYYY-MM)
export async function getSchedulesByMonth(ministry, month) {
  const colRef = getSchedulesCollection(ministry);
  const q = query(colRef, where("month", "==", month));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// Buscar por ID
export async function getScheduleById(ministry, id) {
  const ref = doc(db, "ministries", ministry, "schedules", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}

// Criar escala
export async function createSchedule(ministry, data) {
  const colRef = getSchedulesCollection(ministry);

  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(colRef, payload);

  return {
    id: docRef.id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Atualizar escala
export async function updateSchedule(ministry, id, data) {
  const ref = doc(db, "ministries", ministry, "schedules", id);

  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(ref, payload);

  return {
    id,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

// Remover escala
export async function deleteSchedule(ministry, id) {
  const ref = doc(db, "ministries", ministry, "schedules", id);
  await deleteDoc(ref);
  return true;
}
