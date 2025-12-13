import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function TasksTable({
  tasks = [],
  onEdit,
  onDelete,
}) {
  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-base-200 text-left text-sm font-semibold">
            <th className="p-3">Título</th>
            <th className="p-3">Data</th>
            <th className="p-3">Responsável</th>
            <th className="p-3">Status</th>
            {canEdit && <th className="p-3 w-32 text-center">Ações</th>}
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td
                colSpan={canEdit ? 5 : 4}
                className="p-4 text-center text-sm text-base-content/60"
              >
                Nenhuma tarefa cadastrada.
              </td>
            </tr>
          )}

          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t border-base-300 hover:bg-base-200 transition"
            >
              <td className="p-3 text-sm">{task.title}</td>

              <td className="p-3 text-sm">
                {task.date
                  ? new Date(task.date).toLocaleDateString("pt-BR")
                  : "—"}
              </td>

              <td className="p-3 text-sm">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {task.responsibleName || "—"}
                  </span>
                  {task.responsibleRole && (
                    <span className="text-xs text-base-content/60">
                      {task.responsibleRole}
                    </span>
                  )}
                </div>
              </td>

              <td className="p-3 text-sm">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-base-200">
                  {task.status}
                </span>
              </td>

              {canEdit && (
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => onEdit(task.id)}
                      className="btn btn-ghost btn-xs focus:outline-none focus:ring-0"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onDelete(task.id)}
                      className="btn btn-ghost btn-xs text-error focus:outline-none focus:ring-0"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
