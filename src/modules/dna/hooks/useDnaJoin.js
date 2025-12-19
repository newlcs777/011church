import { useState } from "react";
import { joinDna, hasJoinedDna } from "../services/dnaJoinService";

export default function useDnaJoin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function requestJoin(dnaId, userId) {
    setLoading(true);
    setError(null);

    try {
      const alreadyJoined = await hasJoinedDna(dnaId, userId);

      if (alreadyJoined) {
        throw new Error("Você já solicitou participação neste DNA.");
      }

      await joinDna(dnaId, userId);
    } finally {
      setLoading(false);
    }
  }

  return {
    requestJoin,
    loading,
    error,
  };
}
