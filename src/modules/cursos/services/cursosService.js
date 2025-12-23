import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

const cursosRef = collection(db, "cursos");

/**
 * LISTAR CURSOS
 */
export async function fetchCursosService() {
  const snapshot = await getDocs(cursosRef);

  return snapshot.docs.map((docItem) => {
    const data = docItem.data();

    return {
      id: docItem.id,
      ...data,
      // 🔥 remove Timestamp do Redux
      createdAt: data.createdAt?.toMillis?.() ?? null,
      updatedAt: data.updatedAt?.toMillis?.() ?? null,
    };
  });
}

/**
 * CRIAR CURSO
 */
export async function createCursoService(data) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const ref = await addDoc(cursosRef, payload);

  // 🔥 Redux recebe OBJETO LIMPO
  return {
    id: ref.id,
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/**
 * ATUALIZAR CURSO
 */
export async function updateCursoService({ id, ...data }) {
  await updateDoc(doc(db, "cursos", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

  // 🔥 Redux recebe OBJETO LIMPO
  return {
    id,
    ...data,
    updatedAt: Date.now(),
  };
}

/**
 * DELETAR CURSO
 */
export async function deleteCursoService(id) {
  await deleteDoc(doc(db, "cursos", id));
  return id;
}
