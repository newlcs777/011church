import { useState } from "react";

/* ===============================
   HELPERS
================================ */
function parseLocalDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatShortDate(dateStr) {
  return parseLocalDate(dateStr).toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

function normalizeCult(cult) {
  return cult ? cult.toLowerCase() : "";
}

/* ===============================
   COMPONENT
================================ */
export default function ScheduleReadMode({
  schedulesByDate,
  getMemberName,
}) {
  const [filter, setFilter] = useState("");

  const dates = Object.keys(schedulesByDate)
    .sort((a, b) => parseLocalDate(a) - parseLocalDate(b))
    .filter((date) => {
      if (!filter) return true;

      return schedulesByDate[date].some((s) =>
        getMemberName(s.memberId)
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    });

  return (
    <div className="max-w-5xl mx-auto">
      {/* ===============================
          FILTRO (SEMPRE VISÍVEL)
      ================================ */}
      <input
        type="text"
        placeholder="Filtrar por nome (ex: Lucas)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="
          input
          input-bordered
          input-sm
          w-full
          mb-4
        "
      />

      {/* ===============================
          SEM RESULTADOS
      ================================ */}
      {dates.length === 0 && (
        <p className="text-sm text-base-content/60 text-center py-6">
          Nenhuma escala encontrada.
        </p>
      )}

      {/* ===============================
          DESKTOP / TABLET → TABELA
      ================================ */}
      {dates.length > 0 && (
        <div className="hidden sm:block overflow-x-auto">
          <table className="table table-zebra table-sm w-full">
            <thead>
              <tr>
                <th className="w-36">Dia</th>
                <th>Manhã</th>
                <th>Noite</th>
              </tr>
            </thead>

            <tbody>
              {dates.map((date) => {
                const morning = [];
                const night = [];

                schedulesByDate[date]
                  .filter((s) =>
                    !filter
                      ? true
                      : getMemberName(s.memberId)
                          .toLowerCase()
                          .includes(filter.toLowerCase())
                  )
                  .forEach((s) => {
                    const cult = normalizeCult(s.cult);

                    if (cult.includes("man")) {
                      morning.push(getMemberName(s.memberId));
                    } else if (cult.includes("noi")) {
                      night.push(getMemberName(s.memberId));
                    }
                  });

                return (
                  <tr key={date}>
                    <td className="font-medium">
                      {formatShortDate(date)}
                    </td>

                    <td className="text-sm">
                      {morning.length > 0
                        ? morning.join(", ")
                        : "—"}
                    </td>

                    <td className="text-sm">
                      {night.length > 0
                        ? night.join(", ")
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ===============================
          MOBILE → CARDS
      ================================ */}
      {dates.length > 0 && (
        <div className="sm:hidden flex flex-col gap-3">
          {dates.map((date) => {
            const morning = [];
            const night = [];

            schedulesByDate[date]
              .filter((s) =>
                !filter
                  ? true
                  : getMemberName(s.memberId)
                      .toLowerCase()
                      .includes(filter.toLowerCase())
              )
              .forEach((s) => {
                const cult = normalizeCult(s.cult);

                if (cult.includes("man")) {
                  morning.push(getMemberName(s.memberId));
                } else if (cult.includes("noi")) {
                  night.push(getMemberName(s.memberId));
                }
              });

            return (
              <div
                key={date}
                className="
                  border
                  border-base-300
                  rounded-xl
                  p-3
                  bg-base-100
                "
              >
                <div className="text-sm font-semibold mb-2">
                  {formatShortDate(date)}
                </div>

                <div className="text-sm text-base-content/70">
                  <span className="font-medium">Manhã:</span>{" "}
                  {morning.length > 0
                    ? morning.join(", ")
                    : "—"}
                </div>

                <div className="text-sm text-base-content/70">
                  <span className="font-medium">Noite:</span>{" "}
                  {night.length > 0
                    ? night.join(", ")
                    : "—"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
