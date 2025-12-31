import { useAuthContext } from "@/modules/auth/context/AuthContext";
import { FaTrash } from "react-icons/fa";

export default function MembersTable({
  members = [],
  onEdit,
  onDelete, // ✅ agora usado
}) {
  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  if (!members || members.length === 0) {
    return (
      <p className="p-4 text-sm text-base-content/60 text-center">
        Nenhum membro cadastrado.
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

          return (
            <div
              key={member.id}
              className="
                border
                border-base-300
                rounded-xl
                p-4
                bg-base-100
                flex
                justify-between
                items-center
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {member.name}
                  </span>

                  {!hasSigned && (
                    <span className="
                      text-[10px]
                      px-2
                      py-0.5
                      rounded-full
                      bg-base-200
                      text-base-content/60
                      font-medium
                    ">
                      Termo pendente
                    </span>
                  )}
                </div>

                <span className="text-xs text-base-content/70">
                  Função: {member.role || "—"}
                </span>
              </div>

              {canEdit && onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(member.id)}
                  className="
                    text-base-content/40
                    hover:text-error
                    transition
                  "
                >
                  <FaTrash size={14} />
                </button>
              )}
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
              {canEdit && <th className="p-3 text-right">Ações</th>}
            </tr>
          </thead>

          <tbody>
            {members.map((member) => {
              const hasSigned = member.termSigned === true;

              return (
                <tr
                  key={member.id}
                  className="border-t border-base-300"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {member.name}
                      </span>

                      {!hasSigned && (
                        <span className="
                          text-[10px]
                          px-2
                          py-0.5
                          rounded-full
                          bg-base-200
                          text-base-content/60
                          font-medium
                        ">
                          Termo pendente
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3 text-sm text-base-content/70">
                    {member.role || "—"}
                  </td>

                  {canEdit && onDelete && (
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => onDelete(member.id)}
                        className="
                          text-base-content/40
                          hover:text-error
                          transition
                        "
                      >
                        <FaTrash size={14} />
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
