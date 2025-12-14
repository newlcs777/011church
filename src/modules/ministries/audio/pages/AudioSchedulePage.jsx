import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MinistryPageWrapper from "../../components/MinistryPageWrapper.jsx";
import AudioScheduleCalendar from "../schedule/AudioScheduleCalendar.jsx";

import {
  fetchSchedules,
  removeSchedule,
} from "../../store/scheduleSlice.js";
import { fetchMembers } from "../../store/membersSlice.js";

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
      {/* HEADER SUPERIOR */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="
            h-9
            px-4
            rounded-lg
            border
            border-base-300
            bg-base-100
            text-sm
            text-base-content/80
            hover:bg-base-200
            transition
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
              h-9
              px-4
              rounded-lg
              border
              border-base-300
              bg-base-100
              text-sm
              text-base-content/80
              hover:bg-base-200
              transition
            "
          >
            Nova escala
          </button>
        )}
      </div>

      {!canManage && (
        <p className="mb-4 text-center text-xs text-base-content/60">
          Você está visualizando a escala em modo somente leitura.
        </p>
      )}

      {/* TÍTULO */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">
          Escala do Ministério de Áudio
        </h1>
        <p className="mt-1 text-sm text-base-content/60">
          Selecione um dia no calendário para criar ou visualizar a escala.
        </p>
      </div>

      {/* CONTEÚDO (SEM CARD DUPLICADO) */}
      {loading ? (
        <div className="py-10 text-center text-sm text-base-content/60">
          Carregando escalas…
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
