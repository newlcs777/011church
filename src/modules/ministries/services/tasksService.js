import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

// ======================================================
// SERIALIZAÇÃO SEGURA (NÃO VAZA Timestamp)
// ======================================================
function serializeFirestore(value) {
  if (value === null || value === undefined) return value;

  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }

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
// COLLECTION
// ======================================================
// ministries/{ministry}/tasks
function getTasksCollection(ministry) {
  return collection(db, "ministries", ministry, "tasks");
}

// ======================================================
// GET TASKS
// ======================================================
export async function getTasks(ministry) {
  const snap = await getDocs(getTasksCollection(ministry));

  return snap.docs.map((d) => ({
    id: d.id,
    ...serializeFirestore(d.data()),
  }));
}

// ======================================================
// CREATE TASK
// ======================================================
export async function createTask(ministry, data) {
  const payload = {
    title: data.title,
    date: data.date,
    status: data.status,
    description: data.description,

    // 🔥 SOMENTE ID (relacionamento)
    responsibleId: data.responsibleId,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const ref = await addDoc(getTasksCollection(ministry), payload);

  return {
    id: ref.id,
    title: data.title,
    date: data.date,
    status: data.status,
    description: data.description,
    responsibleId: data.responsibleId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ======================================================
// UPDATE TASK
// ======================================================
export async function updateTask(ministry, id, data) {
  const payload = {
    title: data.title,
    date: data.date,
    status: data.status,
    description: data.description,
    responsibleId: data.responsibleId,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(
    doc(db, "ministries", ministry, "tasks", id),
    payload
  );

  return {
    id,
    title: data.title,
    date: data.date,
    status: data.status,
    description: data.description,
    responsibleId: data.responsibleId,
    updatedAt: new Date().toISOString(),
  };
}

// ======================================================
// DELETE TASK
// ======================================================
export async function deleteTask(ministry, id) {
  await deleteDoc(
    doc(db, "ministries", ministry, "tasks", id)
  );
  return true;
}
