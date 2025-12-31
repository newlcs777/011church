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

  // ✅ CORREÇÃO: membros vêm do vínculo real do áudio
  const members = useSelector(
    (state) => state.membersGlobal.byMinistry.audio || []
  );

  const grouped = groupSchedulesByDate(schedules || []);
  const today = new Date();

  const canManageSchedule =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider" ||
    user?.role === "obreiro";

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const [viewMode, setViewMode] = useState(
    canManageSchedule ? "calendar" : "read"
  );

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
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={goPrevMonth}
          className="
            h-8
            w-8
            flex
            items-center
            justify-center
            rounded-full
            border
            border-base-300
            bg-base-100
            text-base-content/60
            hover:bg-base-200
            transition
          "
        >
          ‹
        </button>

        <div className="text-center">
          <h2 className="text-sm sm:text-base font-semibold capitalize">
            {monthLabel}
          </h2>
          <p className="text-[11px] text-base-content/50">
            Toque em um dia para gerenciar a escala
          </p>
        </div>

        <button
          onClick={goNextMonth}
          className="
            h-8
            w-8
            flex
            items-center
            justify-center
            rounded-full
            border
            border-base-300
            bg-base-100
            text-base-content/60
            hover:bg-base-200
            transition
          "
        >
          ›
        </button>
      </div>

      {canManageSchedule && (
        <div className="flex justify-center mb-4">
          <div
            className="
              inline-flex
              rounded-full
              bg-base-200
              p-1
              gap-1
            "
          >
            {["calendar", "read"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  h-7
                  px-4
                  rounded-full
                  text-xs
                  transition
                  ${
                    viewMode === mode
                      ? "bg-base-100 text-base-content shadow-sm"
                      : "text-base-content/60 hover:bg-base-100/60"
                  }
                `}
              >
                {mode === "calendar" ? "Calendário" : "Lista"}
              </button>
            ))}
          </div>
        </div>
      )}

      {!canManageSchedule && (
        <p className="text-xs text-center text-base-content/50 mb-3">
          Visualização somente leitura
        </p>
      )}

      {viewMode === "read" && (
        <ScheduleReadMode
          schedulesByDate={grouped}
          getMemberName={getMemberName}
        />
      )}

      {viewMode === "calendar" && canManageSchedule && (
        <>
          <div className="grid grid-cols-7 text-[10px] font-medium text-center text-base-content/60 mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, i) => (
              <div key={d} className={i === 0 ? "text-error" : ""}>
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2">
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

              const isSunday =
                new Date(currentYear, currentMonth, day).getDay() === 0;

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className="
                    relative
                    mx-auto
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    transition
                    hover:bg-base-200
                  "
                >
                  <span
                    className={`
                      ${isSunday ? "text-error" : "text-base-content"}
                      ${isToday ? "font-bold" : ""}
                    `}
                  >
                    {day}
                  </span>

                  {hasSchedule && (
                    <span
                      className="
                        absolute
                        bottom-1
                        h-1
                        w-1
                        rounded-full
                        bg-primary
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>

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
