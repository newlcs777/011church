import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

const COLLECTION = "events";

/**
 * 🔹 Normaliza datas para não quebrar Redux
 */
function normalizeEvent(id, data) {
  return {
    id,
    ...data,
    createdAt: data?.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data?.createdAt ?? null,
    updatedAt: data?.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : data?.updatedAt ?? null,
  };
}

/**
 * Buscar todos os eventos
 */
export async function getEvents() {
  const snapshot = await getDocs(collection(db, COLLECTION));

  return snapshot.docs.map((d) =>
    normalizeEvent(d.id, d.data())
  );
}

/**
 * Buscar evento por ID
 */
export async function getEvent(id) {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return normalizeEvent(snap.id, snap.data());
}

/**
 * Criar evento
 */
export async function createEvent(evt) {
  const payload = {
    ...evt,
    createdAt: new Date().toISOString(), // ✔ serializável
  };

  const ref = await addDoc(
    collection(db, COLLECTION),
    payload
  );

  return {
    id: ref.id,
    ...payload,
  };
}

/**
 * Atualizar evento
 */
export async function updateEvent(updated) {
  const ref = doc(db, COLLECTION, updated.id);

  const { id, ...data } = updated;

  const payload = {
    ...data,
    updatedAt: new Date().toISOString(), // ✔ serializável
  };

  await updateDoc(ref, payload);

  return {
    id,
    ...payload,
  };
}

/**
 * Deletar evento
 */
export async function deleteEvent(id) {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
