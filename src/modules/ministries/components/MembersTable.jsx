import { useState } from "react";
import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function MembersTable({
  members = [],
  onEdit,
  onDelete,
}) {
  const { user } = useAuthContext();
  const [confirmId, setConfirmId] = useState(null);

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const canDelete =
    user?.role === "admin" ||
    user?.role === "pastor";

  if (!members || members.length === 0) {
    return (
      <p className="p-4 text-sm text-base-content/60 text-center">
        Nenhum membro cadastrado.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-base-300 bg-base-100">
      <table className="w-full border-collapse">
        {/* DESKTOP HEADER */}
        <thead className="hidden sm:table-header-group">
          <tr className="bg-base-200 text-sm font-medium text-base-content/60">
            <th className="p-3">Nome</th>
            <th className="p-3">Função</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-t border-base-300 hover:bg-base-200 transition"
            >
              {/* NOME + META (MOBILE) */}
              <td className="p-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm sm:text-base font-medium text-base-content/70">
                    {member.name}
                  </span>

                  <span className="text-sm text-base-content/60">
                    {member.role}
                    {!member.termSigned && (
                      <>
                        {" "}
                        • Termo pendente
                      </>
                    )}
                  </span>
                </div>
              </td>

              {/* FUNÇÃO (DESKTOP) */}
              <td className="p-3 hidden sm:table-cell">
                <span className="text-sm text-base-content/70">
                  {member.role}
                </span>
              </td>

              {/* AÇÕES */}
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  {canEdit && (
                    <button
                      onClick={() => onEdit(member.id)}
                      className="
                        text-xs
                        font-medium
                        text-base-content/60
                        rounded-lg
                        px-2
                        py-1
                        transition
                        hover:bg-base-200
                        hover:shadow-sm
                        active:scale-[0.98]
                      "
                    >
                      Ajustar
                    </button>
                  )}

                  {canDelete && (
                    <>
                      {confirmId === member.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-base-content/60">
                            Confirmar?
                          </span>

                          <button
                            onClick={() => {
                              onDelete(member.id);
                              setConfirmId(null);
                            }}
                            className="
                              text-xs
                              font-medium
                              text-error
                              rounded-lg
                              px-2
                              py-1
                              transition
                              hover:bg-base-200
                              hover:shadow-sm
                            "
                          >
                            Sim
                          </button>

                          <button
                            onClick={() => setConfirmId(null)}
                            className="
                              text-xs
                              font-medium
                              text-base-content/60
                              rounded-lg
                              px-2
                              py-1
                              transition
                              hover:bg-base-200
                            "
                          >
                            Não
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(member.id)}
                          className="
                            text-xs
                            font-medium
                            text-error
                            rounded-lg
                            px-2
                            py-1
                            transition
                            hover:bg-base-200
                            hover:shadow-sm
                            active:scale-[0.98]
                          "
                        >
                          Remover
                        </button>
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
