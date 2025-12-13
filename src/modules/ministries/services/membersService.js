import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

function getMembersCollection(ministry) {
  return collection(db, "ministries", ministry, "members");
}

function normalizeTimestamps(data) {
  return {
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt ?? null,
    updatedAt: data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt ?? null,
  };
}

export async function createMember(ministry, data) {
  const colRef = getMembersCollection(ministry);

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

export async function getMembers(ministry) {
  const colRef = getMembersCollection(ministry);
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...normalizeTimestamps(d.data()),
  }));
}

export async function getMemberById(ministry, id) {
  const ref = doc(db, "ministries", ministry, "members", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...normalizeTimestamps(snap.data()),
  };
}

export async function updateMember(ministry, id, data) {
  const ref = doc(db, "ministries", ministry, "members", id);

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

export async function deleteMember(ministry, id) {
  const ref = doc(db, "ministries", ministry, "members", id);
  await deleteDoc(ref);
  return true;
}
