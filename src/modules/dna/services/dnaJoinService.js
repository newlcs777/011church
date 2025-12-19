import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

const COLLECTION = "dna_inscricoes";

/**
 * Verifica se o usuário já se inscreveu nesse DNA
 */
export async function hasJoinedDna(dnaId, userId) {
  const q = query(
    collection(db, COLLECTION),
    where("dnaId", "==", dnaId),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

/**
 * Criar inscrição no DNA
 */
export async function joinDna(dnaId, userId) {
  return addDoc(collection(db, COLLECTION), {
    dnaId,
    userId,
    status: "pendente",
    createdAt: new Date(),
  });
}
