import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function TasksTable({
  tasks = [],
  members = [],
  onEdit,
}) {
  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

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
        {/* HEADER DESKTOP */}
        <thead className="hidden sm:table-header-group">
          <tr className="bg-base-200 text-sm font-medium text-base-content/60">
            <th className="p-3 text-left">Serviço</th>
            <th className="p-3 text-left">Responsável</th>
            <th className="p-3 text-left">Situação</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            const responsible = members.find(
              (m) => m.id === task.responsibleId
            );

            return (
              <tr
                key={task.id}
                onClick={
                  canEdit
                    ? () => onEdit(task.id)
                    : undefined
                }
                className={`
                  border-t
                  border-base-300
                  transition
                  ${
                    canEdit
                      ? "cursor-pointer hover:bg-base-200"
                      : ""
                  }
                `}
              >
                {/* SERVIÇO + META (MOBILE) */}
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm sm:text-base font-medium text-base-content/70">
                      {task.title}
                    </span>

                    {/* RESPONSÁVEL — MOBILE */}
                    <span className="text-sm text-base-content/60 sm:hidden">
                      {responsible?.name || "—"}
                      {responsible?.role && (
                        <> • {responsible.role}</>
                      )}
                    </span>
                  </div>
                </td>

                {/* RESPONSÁVEL — DESKTOP */}
                <td className="p-3 hidden sm:table-cell">
                  <div className="flex flex-col">
                    <span className="text-sm text-base-content/70">
                      {responsible?.name || "—"}
                    </span>
                    {responsible?.role && (
                      <span className="text-sm text-base-content/60">
                        {responsible.role}
                      </span>
                    )}
                  </div>
                </td>

                {/* STATUS */}
                <td className="p-3 hidden sm:table-cell">
                  <span className="text-sm text-base-content/60">
                    {task.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
