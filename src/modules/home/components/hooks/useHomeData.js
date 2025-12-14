import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDailyVerse } from "../../store/homeThunks";
import useAuth from "@/modules/auth/hooks/useAuth";
import {
  getHomePermissions,
  getQuickActions,
} from "../../utils/homePermissions";

// ✅ caminho correto
import { getDailyVerseFromJson } from "../../utils/getDailyVerseFromJson";

export default function useHomeData() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { verse, loading } = useSelector((state) => state.home);

  useEffect(() => {
    // 🔥 força trocar versículo a cada reload
    localStorage.removeItem("dailyVerse");

    const newVerse = getDailyVerseFromJson();

    if (!newVerse && !verse) {
      dispatch(fetchDailyVerse());
    }
  }, [dispatch]);

  return {
    verse: getDailyVerseFromJson() || verse,
    loading,
    role: user?.role,
    permissions: getHomePermissions(user?.role),
    quickActions: getQuickActions(user?.role),
  };
}
