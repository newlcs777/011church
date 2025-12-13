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

// Caminho: ministries/{ministry}/tasks
function getTasksCollection(ministry) {
  return collection(db, "ministries", ministry, "tasks");
}

export async function getTasks(ministry) {
  const colRef = getTasksCollection(ministry);
  const snap = await getDocs(colRef);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function createTask(ministry, data) {
  const colRef = getTasksCollection(ministry);

  const payload = {
    title: data.title,
    date: data.date,
    status: data.status,
    description: data.description,

    responsibleId: data.responsibleId,
    responsibleName: data.responsibleName,
    responsibleRole: data.responsibleRole,

    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(colRef, payload);

  return {
    id: ref.id,
    ...payload,
    createdAt: new Date().toISOString(),
  };
}

export async function updateTask(ministry, id, data) {
  const ref = doc(db, "ministries", ministry, "tasks", id);

  const payload = {
    title: data.title,
    date: data.date,
    status: data.status,
    description: data.description,

    responsibleId: data.responsibleId,
    responsibleName: data.responsibleName,
    responsibleRole: data.responsibleRole,

    updatedAt: serverTimestamp(),
  };

  await updateDoc(ref, payload);

  return { id, ...payload };
}

export async function deleteTask(ministry, id) {
  const ref = doc(db, "ministries", ministry, "tasks", id);
  await deleteDoc(ref);
  return true;
}
