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

// ======================================================
// SERIALIZAÇÃO SEGURA (NÃO VAZA Timestamp / FieldValue)
// ======================================================
function serializeFirestore(value) {
  if (value === null || value === undefined) return value;

  // Timestamp real
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }

  // FieldValue (serverTimestamp, increment, etc)
  if (value?.constructor?.name === "FieldValue") {
    return null;
  }

  if (Array.isArray(value)) {
    return value.map(serializeFirestore);
  }

  if (typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = serializeFirestore(v);
    }
    return out;
  }

  return value;
}

// ======================================================
// COLLECTION HELPERS
// ======================================================
function getSchedulesCollection(ministry) {
  return collection(db, "ministries", ministry, "schedules");
}

function getMembersCollection(ministry) {
  return collection(db, "ministries", ministry, "members");
}

// ======================================================
// BUSCAR ESCALAS POR MÊS (YYYY-MM)
// ======================================================
export async function getSchedulesByMonth(ministry, month) {
  const colRef = getSchedulesCollection(ministry);
  const q = query(colRef, where("month", "==", month));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...serializeFirestore(d.data()),
  }));
}

// ======================================================
// BUSCAR ESCALA POR ID
// ======================================================
export async function getScheduleById(ministry, id) {
  const ref = doc(db, "ministries", ministry, "schedules", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...serializeFirestore(snap.data()),
  };
}

// ======================================================
// BUSCAR MEMBROS DO MINISTÉRIO (COM DADOS COMPLETOS)
// ======================================================
export async function getMembersForSchedule(ministry) {
  const snapshot = await getDocs(
    getMembersCollection(ministry)
  );

  return snapshot.docs.map((d) => {
    const data = serializeFirestore(d.data());

    return {
      id: d.id,
      name: data.name ?? "",
      role: data.role ?? "",
    };
  });
}

// ======================================================
// CRIAR ESCALA
// ======================================================
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

// ======================================================
// ATUALIZAR ESCALA
// ======================================================
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

// ======================================================
// REMOVER ESCALA
// ======================================================
export async function deleteSchedule(ministry, id) {
  const ref = doc(db, "ministries", ministry, "schedules", id);
  await deleteDoc(ref);
  return true;
}
