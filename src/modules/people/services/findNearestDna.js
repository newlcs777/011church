import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getDistanceKm } from "../utils/distance";

export async function findNearestDna(personLocation) {
  if (!personLocation?.lat || !personLocation?.lng) {
    return null;
  }

  const snapshot = await getDocs(collection(db, "dna"));

  let nearest = null;
  let minDistance = Infinity;

  snapshot.docs.forEach((docSnap) => {
    const dna = { id: docSnap.id, ...docSnap.data() };

    if (!dna.location?.lat || !dna.location?.lng) return;

    const distance = getDistanceKm(
      personLocation,
      dna.location
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = {
        ...dna,
        distance,
      };
    }
  });

  return nearest;
}
