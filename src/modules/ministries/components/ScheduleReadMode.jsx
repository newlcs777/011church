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
    <div className="w-full max-w-4xl mx-auto">
      {/* ===============================
          FILTRO
      ================================ */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar voluntário pelo nome…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
            w-full
            h-9
            px-3
            rounded-lg
            border
            border-base-300
            bg-base-100
            text-sm
            placeholder:text-base-content/40
            focus:outline-none
            focus:ring-1
            focus:ring-base-300
          "
        />
      </div>

      {/* ===============================
          SEM RESULTADOS
      ================================ */}
      {dates.length === 0 && (
        <p className="text-sm text-base-content/50 text-center py-8">
          Nenhuma escala encontrada com esse filtro.
        </p>
      )}

      {/* ===============================
          DESKTOP / TABLET → TABELA LIMPA
      ================================ */}
      {dates.length > 0 && (
        <div className="hidden sm:block overflow-hidden rounded-2xl border border-base-300">
          <table className="w-full text-sm">
            <thead className="bg-base-200/60">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-32">
                  Dia
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  Manhã
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  Noite
                </th>
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
                  <tr
                    key={date}
                    className="border-t border-base-300"
                  >
                    <td className="px-4 py-3 font-medium">
                      {formatShortDate(date)}
                    </td>

                    <td className="px-4 py-3 text-base-content/80">
                      {morning.length > 0
                        ? morning.join(", ")
                        : "—"}
                    </td>

                    <td className="px-4 py-3 text-base-content/80">
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
          MOBILE → CARDS (PADRÃO IGREJA)
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
                  bg-base-100
                  border
                  border-base-300
                  rounded-2xl
                  p-4
                "
              >
                <div className="text-sm font-semibold mb-2">
                  {formatShortDate(date)}
                </div>

                <div className="text-sm text-base-content/70 mb-1">
                  <span className="font-medium">
                    Manhã:
                  </span>{" "}
                  {morning.length > 0
                    ? morning.join(", ")
                    : "Nenhum voluntário"}
                </div>

                <div className="text-sm text-base-content/70">
                  <span className="font-medium">
                    Noite:
                  </span>{" "}
                  {night.length > 0
                    ? night.join(", ")
                    : "Nenhum voluntário"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
