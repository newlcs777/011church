import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

const COLLECTION = "dna_inscricoes";

export async function getInscriptionsByDna(dnaId) {
  const q = query(
    collection(db, COLLECTION),
    where("dnaId", "==", dnaId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function updateInscriptionStatus(id, status) {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { status });
}
