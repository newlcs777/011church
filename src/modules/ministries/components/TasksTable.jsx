import { useState } from "react";
import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function TasksTable({
  tasks = [],
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

  if (!tasks || tasks.length === 0) {
    return (
      <p className="p-4 text-sm text-base-content/60 text-center">
        Nenhum serviço registrado no ministério.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-base-300 bg-base-100">
      <table className="w-full border-collapse">
        {/* DESKTOP HEADER */}
        <thead className="hidden sm:table-header-group">
          <tr className="bg-base-200 text-sm font-medium text-base-content/60">
            <th className="p-3">Serviço</th>
            <th className="p-3">Responsável</th>
            <th className="p-3">Situação</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t border-base-300 hover:bg-base-200 transition"
            >
              {/* SERVIÇO + META (MOBILE) */}
              <td className="p-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm sm:text-base font-medium text-base-content/70">
                    {task.title}
                  </span>

                  <span className="text-sm text-base-content/60">
                    {task.responsibleName || "—"}
                    {task.responsibleRole && (
                      <> • {task.responsibleRole}</>
                    )}
                  </span>
                </div>
              </td>

              {/* RESPONSÁVEL (DESKTOP) */}
              <td className="p-3 hidden sm:table-cell">
                <div className="flex flex-col">
                  <span className="text-sm text-base-content/70">
                    {task.responsibleName || "—"}
                  </span>
                  {task.responsibleRole && (
                    <span className="text-sm text-base-content/60">
                      {task.responsibleRole}
                    </span>
                  )}
                </div>
              </td>

              {/* STATUS (DESKTOP) */}
              <td className="p-3 hidden sm:table-cell">
                <span className="text-sm text-base-content/60">
                  {task.status}
                </span>
              </td>

              {/* AÇÕES */}
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  {canEdit && (
                    <button
                      onClick={() => onEdit(task.id)}
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
                      {confirmId === task.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-base-content/60">
                            Confirmar?
                          </span>

                          <button
                            onClick={() => {
                              onDelete(task.id);
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
                          onClick={() => setConfirmId(task.id)}
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
