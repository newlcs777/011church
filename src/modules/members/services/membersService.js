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

/* ======================================================
   MEMBROS GLOBAIS (IGREJA)
====================================================== */

export async function getMembers() {
  const snap = await getDocs(collection(db, "members"));
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function findMemberByPhone(phone) {
  const q = query(
    collection(db, "members"),
    where("phone", "==", phone)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  const docRef = snap.docs[0];
  return { id: docRef.id, ...docRef.data() };
}

export async function createMember(data) {
  const ref = doc(collection(db, "members"));
  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: ref.id, ...data };
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
  return { id, ...data };
}

export async function deleteMember(id) {
  await deleteDoc(doc(db, "members", id));
}

/* ======================================================
   🔥 VÍNCULO MEMBRO ↔ MINISTÉRIO (CORRIGIDO)
====================================================== */

/**
 * Lista membros vinculados a um ministério
 * path: ministries/{ministry}/members/{memberId}
 */
export async function getMembersByMinistry(ministry) {
  const snap = await getDocs(
    collection(db, "ministries", ministry, "members")
  );

  return snap.docs.map((d) => {
    const data = d.data();

    return {
      id: d.id,          // memberId
      memberId: data.memberId,
      name: data.name ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",

      // ✅ NORMALIZA TIMESTAMP
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : null,
    };
  });
}


/**
 * Vincula membro global a um ministério
 * ✅ AGORA SALVA DADOS NECESSÁRIOS PARA UI (name, phone, email)
 */
export async function linkMemberToMinistry(ministry, memberId) {
  const globalRef = doc(db, "members", memberId);
  const globalSnap = await getDoc(globalRef);

  if (!globalSnap.exists()) {
    throw new Error("Membro global não encontrado");
  }

  const memberData = globalSnap.data();

  const ref = doc(
    db,
    "ministries",
    ministry,
    "members",
    memberId
  );

  await setDoc(ref, {
    memberId,
    name: memberData.name ?? "",
    phone: memberData.phone ?? "",
    email: memberData.email ?? "",
    createdAt: serverTimestamp(),
  });
}

/**
 * Remove vínculo do membro com o ministério
 * NÃO apaga o membro global
 */
export async function unlinkMemberFromMinistry(
  ministry,
  memberId
) {
  const ref = doc(
    db,
    "ministries",
    ministry,
    "members",
    memberId
  );

  await deleteDoc(ref);
}
