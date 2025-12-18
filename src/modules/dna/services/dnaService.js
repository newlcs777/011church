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

const COLLECTION = "dna";

/**
 * Buscar todos os DNAs
 */
export async function getDnas() {
  const snapshot = await getDocs(
    collection(db, COLLECTION)
  );

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/**
 * Buscar DNA por ID
 */
export async function getDnaById(id) {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}

/**
 * Criar DNA
 */
export async function createDna(dna) {
  const payload = {
    nome: dna.nome || "",
    dia: dna.dia || "",
    horario: dna.horario || "",

    liderId: dna.liderId || null,
    liderNome: dna.liderNome || "",
    whatsapp: dna.whatsapp || "",

    cep: dna.cep || "",
    endereco: dna.endereco || "",
    bairro: dna.bairro || "",
    cidade: dna.cidade || "",
    estado: dna.estado || "",

    // localização (obrigatória para busca por distância)
    location: dna.location || null,

    createdAt: new Date(),
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
 * Atualizar DNA
 */
export async function updateDna(id, data) {
  const payload = {
    nome: data.nome || "",
    dia: data.dia || "",
    horario: data.horario || "",

    liderId: data.liderId || null,
    liderNome: data.liderNome || "",
    whatsapp: data.whatsapp || "",

    cep: data.cep || "",
    endereco: data.endereco || "",
    bairro: data.bairro || "",
    cidade: data.cidade || "",
    estado: data.estado || "",

    location: data.location || null,

    updatedAt: new Date(),
  };

  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, payload);
}

/**
 * 🔥 EXCLUIR DNA (DELETE REAL)
 */
export async function deleteDna(id) {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
