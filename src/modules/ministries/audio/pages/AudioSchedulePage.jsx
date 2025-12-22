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
    dispatch(
      fetchSchedules({
        ministry: "audio",
        month: currentMonth,
      })
    );
  }, [dispatch, currentMonth]);

  function handleRemove(id) {
    if (!canManage) return;
    dispatch(removeSchedule({ ministry: "audio", id }));
  }

  return (
    <MinistryPageWrapper>
      {/* TÍTULO */}
      <div className="px-3 mb-3">
        <h1
          className="
            text-lg
            sm:text-2xl
            font-semibold
            leading-tight
          "
        >
          Escala do Ministério de Áudio
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-base-content/60
            max-w-md
          "
        >
          Aqui você pode acompanhar e organizar quem servirá em cada dia.
          Toque em uma data para ver os detalhes.
        </p>
      </div>

      {/* AÇÃO – NOVA ESCALA */}
      {canManage && (
        <div
          className="
            px-3
            mb-3
            flex
            justify-end
          "
        >
          <button
            onClick={() =>
              navigate("/ministerios/audio/schedule/create")
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              tracking-wide
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              text-neutral/70
              hover:bg-base-200/70
              whitespace-nowrap
            "
          >
            + Criar nova escala
          </button>
        </div>
      )}

      {!canManage && (
        <p
          className="
            mb-3
            text-center
            text-xs
            text-base-content/60
            px-3
          "
        >
          Você está apenas visualizando a escala.
          Para alterações, procure a liderança do ministério.
        </p>
      )}

      {/* CONTEÚDO */}
      {loading ? (
        <div className="py-6 text-center text-sm text-base-content/60">
          Estamos carregando as escalas…
        </div>
      ) : (
        <AudioScheduleCalendar
          schedules={items}
          onCreate={(date) => {
            if (!canManage) return;
            navigate(
              `/ministerios/audio/schedule/create?date=${date}`
            );
          }}
          onEdit={(id) => {
            if (!canManage) return;
            navigate(
              `/ministerios/audio/schedule/edit/${id}`
            );
          }}
          onRemove={handleRemove}
        />
      )}
    </MinistryPageWrapper>
  );
}
