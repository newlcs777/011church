import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function MembersTable({
  members = [],
  onEdit,
  onAction,
  actionLabel = "Adicionar",
}) {
  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  if (!Array.isArray(members) || members.length === 0) {
    return (
      <p className="p-4 text-sm text-base-content/60 text-center">
        Nenhum membro encontrado.
      </p>
    );
  }

  return (
    <>
      {/* =========================
          MOBILE — CARDS
      ========================= */}
      <div className="flex flex-col gap-3 sm:hidden">
        {members.map((member) => {
          const hasSigned = member.termSigned === true;
          const clickable = canEdit && onEdit;

          return (
            <div
              key={member.id}
              onClick={
                clickable
                  ? () => onEdit(member.id)
                  : undefined
              }
              className={`
                border
                border-base-300
                rounded-xl
                p-4
                bg-base-100
                transition
                ${
                  clickable
                    ? "cursor-pointer active:scale-[0.98]"
                    : ""
                }
              `}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span
                    className={`
                      text-sm
                      font-medium
                      ${
                        hasSigned
                          ? "text-base-content"
                          : "text-base-content/80"
                      }
                    `}
                  >
                    {member.name}
                  </span>

                  {!hasSigned && (
                    <span
                      className="
                        ml-2
                        text-[10px]
                        px-2
                        py-0.5
                        rounded-full
                        bg-base-200
                        text-base-content/60
                        font-medium
                      "
                    >
                      Pendente
                    </span>
                  )}
                </div>

                {/* BOTÃO — GHOST */}
                {onAction && canEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction(member.id);
                    }}
                    className="
                      px-3
                      py-1
                      text-xs
                      rounded-lg
                      border
                      border-base-300
                      text-base-content/70
                      hover:bg-base-200
                      hover:text-base-content
                      transition
                    "
                  >
                    {actionLabel}
                  </button>
                )}
              </div>

              <p className="text-xs text-base-content/70 mt-1">
                Função: {member.role || "—"}
              </p>

              <p className="text-xs text-base-content/70 mt-1">
                Ministérios:{" "}
                {Array.isArray(member.ministries) &&
                member.ministries.length > 0
                  ? member.ministries.join(", ")
                  : "—"}
              </p>
            </div>
          );
        })}
      </div>

      {/* =========================
          DESKTOP — TABELA
      ========================= */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-base-300 bg-base-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-base-200 text-sm font-medium text-base-content/60">
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Função</th>
              <th className="p-3 text-left">Ministérios</th>
              {onAction && (
                <th className="p-3 text-right">Ação</th>
              )}
            </tr>
          </thead>

          <tbody>
            {members.map((member) => {
              const rowClickable = !!onEdit && canEdit;
              const hasSigned = member.termSigned === true;

              return (
                <tr
                  key={member.id}
                  onClick={
                    rowClickable
                      ? () => onEdit(member.id)
                      : undefined
                  }
                  className={`
                    border-t
                    border-base-300
                    transition
                    ${
                      rowClickable
                        ? "cursor-pointer hover:bg-base-200"
                        : ""
                    }
                  `}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          text-sm
                          font-medium
                          ${
                            hasSigned
                              ? "text-base-content"
                              : "text-base-content/80"
                          }
                        `}
                      >
                        {member.name}
                      </span>

                      {!hasSigned && (
                        <span
                          className="
                            text-[10px]
                            px-2
                            py-0.5
                            rounded-full
                            bg-base-200
                            text-base-content/60
                            font-medium
                          "
                        >
                          Pendente
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3 text-sm text-base-content/70">
                    {member.role || "—"}
                  </td>

                  <td className="p-3 text-sm text-base-content/70">
                    {Array.isArray(member.ministries) &&
                    member.ministries.length > 0
                      ? member.ministries.join(", ")
                      : "—"}
                  </td>

                  {onAction && (
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAction(member.id);
                        }}
                        className="
                          px-3
                          py-1
                          text-xs
                          rounded-lg
                          border
                          border-base-300
                          text-base-content/70
                          hover:bg-base-200
                          hover:text-base-content
                          transition
                        "
                      >
                        {actionLabel}
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
