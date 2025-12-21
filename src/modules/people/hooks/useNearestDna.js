import { useEffect, useState } from "react";
import { findNearestDna } from "../services/findNearestDna";

export function useNearestDna(person) {
  const [nearestDna, setNearestDna] = useState(null);

  useEffect(() => {
    async function load() {
      if (!person.location?.lat || !person.location?.lng) {
        setNearestDna(null);
        return;
      }

      const dna = await findNearestDna(person.location);
      setNearestDna(dna);
    }

    load();
  }, [person.location]);

  return nearestDna;
}
