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

import { getDistanceKm } from "../utils/distance";
import { geocodeAddress } from "./geoService";

import emailjs from "@emailjs/browser";

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
    liderEmail: dna.liderEmail || "",

    cep: dna.cep || "",
    endereco: dna.endereco || "",
    bairro: dna.bairro || "",
    cidade: dna.cidade || "",
    estado: dna.estado || "",

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
    liderEmail: data.liderEmail || "",

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

export async function notifyLeaderNearestDna(person) {
  if (!person) return;

  // 🔧 CORREÇÃO: garante endereço em STRING
  let addressString = "";

  if (typeof person.endereco === "string") {
    addressString = person.endereco;
  } else if (person.endereco && typeof person.endereco === "object") {
    addressString = `
      ${person.endereco.rua || ""},
      ${person.endereco.numero || ""},
      ${person.endereco.bairro || ""},
      ${person.endereco.cidade || ""},
      ${person.endereco.estado || ""},
      ${person.endereco.cep || ""}
    `;
  }

  if (!addressString.trim()) return;

  const userLocation = await geocodeAddress(addressString);
  if (!userLocation) return;

  const dnas = await getDnas();

  const dnasWithLocation = dnas.filter(
    (dna) => dna.location && dna.liderEmail
  );

  if (!dnasWithLocation.length) return;

  const nearest = dnasWithLocation
    .map((dna) => ({
      ...dna,
      distance: getDistanceKm(
        userLocation,
        dna.location
      ),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  if (!nearest?.liderEmail) return;

  // ✅ ENVIO REAL DO E-MAIL (EmailJS)
await emailjs.send(
  "service_2ni01j9",
    "template_h71guyn", // ✅ ID CORRETO

  {
    lider_email: nearest.liderEmail,
    dna_nome: nearest.nome,
    pessoa_nome: person.nome,
    pessoa_telefone: person.telefone || "",
  }
);

}
