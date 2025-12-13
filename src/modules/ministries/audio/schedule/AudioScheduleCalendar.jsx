import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../../auth/context/AuthContext";

import DayScheduleModal from "../../components/DayScheduleModal";
import ScheduleReadMode from "../../components/ScheduleReadMode";

/* ===============================
   HELPERS
================================ */
function groupSchedulesByDate(schedules) {
  return schedules.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekDay(year, month) {
  return new Date(year, month, 1).getDay();
}

/* ===============================
   COMPONENT
================================ */
export default function AudioScheduleCalendar({
  schedules,
  onCreate,
  onEdit,
  onRemove,
}) {
  const { user } = useAuthContext();

  const members = useSelector((state) => state.members.audio || []);
  const grouped = groupSchedulesByDate(schedules || []);

  const today = new Date();

  /* ===============================
     CONTROLE DE PERFIL
  ================================ */
  const canManageSchedule =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const [viewMode, setViewMode] = useState(
    canManageSchedule ? "calendar" : "read"
  );

  /* 🔒 Garante sincronização caso o usuário mude */
  useEffect(() => {
    setViewMode(canManageSchedule ? "calendar" : "read");
  }, [canManageSchedule]);

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstWeekDay = getFirstWeekDay(currentYear, currentMonth);

  const monthLabel = new Date(
    currentYear,
    currentMonth
  ).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const getMemberName = (memberId) => {
    const member = members.find((m) => m.id === memberId);
    return member ? member.name : "—";
  };

  /* ===============================
     NAVEGAÇÃO
  ================================ */
  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={goPrevMonth}
          className="btn btn-ghost btn-sm rounded-full text-base-content/70"
        >
          ◀
        </button>

        <h2 className="text-xl font-bold capitalize text-center">
          {monthLabel}
        </h2>

        <button
          onClick={goNextMonth}
          className="btn btn-ghost btn-sm rounded-full text-base-content/70"
        >
          ▶
        </button>
      </div>

      {/* AVISO PARA MEMBRO / OBREIRO */}
      {!canManageSchedule && (
        <p className="text-xs text-center text-base-content/50 mb-4">
          Visualização somente leitura
        </p>
      )}

      {/* TOGGLE DE VISÃO (SÓ GESTÃO) */}
      {canManageSchedule && (
        <div className="flex justify-center gap-2 mb-5">
          <button
            onClick={() => setViewMode("calendar")}
            className={`btn btn-sm ${
              viewMode === "calendar" ? "btn-primary" : "btn-ghost"
            }`}
          >
            Calendário
          </button>

          <button
            onClick={() => setViewMode("read")}
            className={`btn btn-sm ${
              viewMode === "read" ? "btn-primary" : "btn-ghost"
            }`}
          >
            Lista
          </button>
        </div>
      )}

      {/* ===============================
          MODO LEITURA (TODOS)
      ================================ */}
      {viewMode === "read" && (
        <ScheduleReadMode
          schedulesByDate={grouped}
          getMemberName={getMemberName}
        />
      )}

      {/* ===============================
          CALENDÁRIO (SOMENTE GESTÃO)
      ================================ */}
      {viewMode === "calendar" && canManageSchedule && (
        <>
          <p className="text-xs text-center text-base-content/60 mb-3">
            Clique em um dia para adicionar ou visualizar a escala
          </p>

          {/* SEMANA */}
          <div className="grid grid-cols-7 text-xs font-semibold text-center text-base-content/70 mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstWeekDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: totalDays }, (_, i) => {
              const day = i + 1;
              const date = `${currentYear}-${String(
                currentMonth + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

              const daySchedules = grouped[date] || [];
              const hasSchedule = daySchedules.length > 0;

              const isToday =
                today.toDateString() ===
                new Date(currentYear, currentMonth, day).toDateString();

              return (
                <div
                  key={date}
                  onClick={() => {
                    if (!canManageSchedule) return;
                    setSelectedDate(date);
                  }}
                  className={`
                    min-h-[96px]
                    rounded-2xl
                    border
                    p-3
                    cursor-pointer
                    transition-all
                    duration-200
                    hover:shadow-md
                    hover:-translate-y-[1px]
                    active:scale-[0.98]
                    ${isToday ? "ring-2 ring-primary" : ""}
                    ${
                      hasSchedule
                        ? "border-primary/40 bg-primary/5"
                        : "border-base-300 bg-base-100"
                    }
                  `}
                >
                  {/* TOPO */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{day}</span>

                    {hasSchedule && (
                      <span className="text-xs bg-primary text-primary-content px-2 py-0.5 rounded-full font-semibold">
                        {daySchedules.length}
                      </span>
                    )}
                  </div>

                  {/* STATUS */}
                  <div className="mt-4 flex items-center justify-center">
                    {hasSchedule ? (
                      <span className="text-xs text-primary font-medium">
                        Escala criada
                      </span>
                    ) : (
                      <span className="text-xs text-base-content/60 font-medium">
                        Criar escala
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MODAL */}
          {selectedDate && (
            <DayScheduleModal
              date={selectedDate}
              schedules={grouped[selectedDate] || []}
              getMemberName={getMemberName}
              onClose={() => setSelectedDate(null)}
              onCreate={(date) => {
                setSelectedDate(null);
                onCreate(date);
              }}
              onEdit={(id) => {
                setSelectedDate(null);
                onEdit(id);
              }}
              onRemove={(id) => {
                onRemove(id);
                setSelectedDate(null);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
