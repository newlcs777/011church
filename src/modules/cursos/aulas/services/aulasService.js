import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

const aulasRef = collection(db, "aulas");

export async function getAulasByCurso(cursoId) {
  const q = query(aulasRef, where("cursoId", "==", cursoId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function createAula(data) {
  const docRef = await addDoc(aulasRef, data);
  return { id: docRef.id, ...data };
}

export async function updateAula(id, data) {
  const ref = doc(db, "aulas", id);
  await updateDoc(ref, data);
}

export async function deleteAula(id) {
  const ref = doc(db, "aulas", id);
  await deleteDoc(ref);
}
