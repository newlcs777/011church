import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ministries/components (global)
import MinistryPageWrapper from "../../components/MinistryPageWrapper.jsx";

// audio/schedule
import AudioScheduleCalendar from "../schedule/AudioScheduleCalendar.jsx";

// store
import {
  fetchSchedules,
  removeSchedule,
} from "../../store/scheduleSlice.js";
import { fetchMembers } from "../../store/membersSlice.js";

// 🔐 AUTH
import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioSchedulePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const canManage =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const {
    items = [],
    currentMonth,
    loading,
  } = useSelector((state) => state.schedule || {});

  useEffect(() => {
    dispatch(fetchMembers("audio"));
    dispatch(fetchSchedules({ ministry: "audio", month: currentMonth }));
  }, [dispatch, currentMonth]);

  function handleRemove(id) {
    if (!canManage) return;

    dispatch(removeSchedule({ ministry: "audio", id }));
  }

  return (
    <MinistryPageWrapper>
      {/* 🔙 HEADER DE AÇÃO */}
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-2
        "
      >
        <button
          onClick={() => navigate(-1)}
          className="
            btn
            btn-ghost
            btn-sm
            rounded-lg
          "
        >
          ← Voltar
        </button>

        {canManage && (
          <button
            onClick={() =>
              navigate("/ministerios/audio/schedule/create")
            }
            className="
              btn
              btn-ghost
              btn-sm
              rounded-lg
            "
          >
            + Nova Escala
          </button>
        )}
      </div>

      {!canManage && (
        <p className="text-xs text-base-content/60 text-center mb-4">
          Visualização somente leitura
        </p>
      )}

      {/* 🟦 TÍTULO CENTRALIZADO */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          Escala — Ministério de Áudio
        </h1>
      </div>

      {/* CONTEÚDO */}
      {loading ? (
        <div
          className="
            mt-6
            p-4
            text-sm
            text-base-content/60
          "
        >
          Carregando…
        </div>
      ) : (
        <AudioScheduleCalendar
          schedules={items}
          onCreate={(date) => {
            if (!canManage) return;
            navigate(`/ministerios/audio/schedule/create?date=${date}`);
          }}
          onEdit={(id) => {
            if (!canManage) return;
            navigate(`/ministerios/audio/schedule/edit/${id}`);
          }}
          onRemove={handleRemove}
        />
      )}
    </MinistryPageWrapper>
  );
}
