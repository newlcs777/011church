import { useEffect, useState } from "react";
import useAuth from "@/modules/auth/hooks/useAuth";

import {
  getHomePermissions,
  getQuickActions,
} from "../../utils/homePermissions";

import { getDailyVerse } from "../../utils/getDailyVerseFromJson";

const STORAGE_KEY = "dailyVerse";

export default function useHomeData() {
  const { user } = useAuth();
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔄 SEMPRE gera um novo versículo a cada F5
    const newVerse = getDailyVerse();

    if (newVerse) {
      // 💾 sobrescreve o cache
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newVerse)
      );
      setVerse(newVerse);
    }

    setLoading(false);
  }, []);

  return {
    verse,
    loading,
    role: user?.role,
    permissions: getHomePermissions(user?.role),
    quickActions: getQuickActions(user?.role),
  };
}
