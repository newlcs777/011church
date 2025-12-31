import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

// 🔒 SERIALIZA Timestamp Firestore (100% seguro)
function serializeFirestore(value) {
  if (value === null || value === undefined) return value;

  // ✅ FIRESTORE TIMESTAMP REAL
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serializeFirestore);
  }

  if (typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = serializeFirestore(v);
    }
    return out;
  }

  return value;
}

/* ======================================================
   MEMBROS GLOBAIS
====================================================== */

export async function getMembers() {
  const snap = await getDocs(collection(db, "members"));

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...serialize(data),
    };
  });
}

export async function findMemberByPhone(phone) {
  const q = query(
    collection(db, "members"),
    where("phone", "==", phone)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  const docRef = snap.docs[0];
  return {
    id: docRef.id,
    ...serialize(docRef.data()),
  };
}

export async function createMember(data) {
  const ref = doc(collection(db, "members"));

  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: ref.id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function updateMember(id, data) {
  const ref = doc(db, "members", id);

  await setDoc(
    ref,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return {
    id,
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

export async function deleteMember(id) {
  await deleteDoc(doc(db, "members", id));
}

/* ======================================================
   VÍNCULO COM MINISTÉRIO
====================================================== */

export async function getMembersByMinistry(ministry) {
  const snap = await getDocs(
    collection(db, "ministries", ministry, "members")
  );

  return snap.docs.map((d) => ({
    id: d.id,
    ...serialize(d.data()),
  }));
}

export async function linkMemberToMinistry(ministry, memberId) {
  const globalRef = doc(db, "members", memberId);
  const snap = await getDoc(globalRef);

  if (!snap.exists()) {
    throw new Error("Membro global não encontrado");
  }

  const memberData = serialize(snap.data());

  await setDoc(
    doc(db, "ministries", ministry, "members", memberId),
    {
      memberId,
      name: memberData.name ?? "",
      phone: memberData.phone ?? "",
      email: memberData.email ?? "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );
}

export async function unlinkMemberFromMinistry(ministry, memberId) {
  await deleteDoc(
    doc(db, "ministries", ministry, "members", memberId)
  );
}
