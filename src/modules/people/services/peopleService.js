import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { geocodeAddress } from "./geoService";

const COLLECTION = "people";

/* =======================
   CREATE
======================= */
export async function createPerson(person) {
  let location;

  const endereco = person.endereco;

  if (
    endereco?.cep &&
    endereco?.cidade &&
    endereco?.estado
  ) {
    const addressString = `
      ${endereco.texto || ""}
      ${endereco.numero || ""}
      ${endereco.cep}
      ${endereco.cidade}
      ${endereco.estado}
      Brasil
    `;

    try {
      const geo = await geocodeAddress(addressString);
      if (geo?.lat && geo?.lng) {
        location = geo;
      }
    } catch (err) {
      console.warn("Geocode falhou:", err.message);
    }
  }

  const payload = {
    ...person,
    createdAt: Timestamp.now().toMillis(),
  };

  if (location) {
    payload.location = location;
  }

  const ref = await addDoc(
    collection(db, COLLECTION),
    payload
  );

  return {
    id: ref.id,
    ...payload,
  };
}

/* =======================
   READ
======================= */
export async function getPeople() {
  const snapshot = await getDocs(
    collection(db, COLLECTION)
  );

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/* =======================
   UPDATE
======================= */
export async function updatePerson(id, data) {
  const ref = doc(db, COLLECTION, id);

  let newLocation; // ⬅️ NÃO inicializa com null

  if (
    data.endereco?.cep &&
    data.endereco?.cidade &&
    data.endereco?.estado
  ) {
    const addressString = `
      ${data.endereco.texto || ""}
      ${data.endereco.numero || ""}
      ${data.endereco.cep}
      ${data.endereco.cidade}
      ${data.endereco.estado}
      Brasil
    `;

    try {
      const geo = await geocodeAddress(addressString);
      if (geo?.lat && geo?.lng) {
        newLocation = geo;
      }
    } catch (err) {
      console.warn(
        "Geocode update falhou:",
        err.message
      );
    }
  }

  const payload = {
    ...data,
    updatedAt: Timestamp.now().toMillis(),
  };

  // ✅ SÓ atualiza location se recalculou
  if (newLocation) {
    payload.location = newLocation;
  }

  await updateDoc(ref, payload);
}

/* =======================
   DELETE
======================= */
export async function deletePerson(id) {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
