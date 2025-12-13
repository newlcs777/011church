export default function MembersTable({ members = [], onEdit, onDelete }) {
  if (!members || members.length === 0) {
    return (
      <p
        className="
          p-4
          text-sm
          text-base-content/60
        "
      >
        Nenhum membro cadastrado.
      </p>
    );
  }

  return (
    <div
      className="
        overflow-x-auto
        rounded-xl
        border
        border-base-300
      "
    >
      <table
        className="
          w-full
          border-collapse
        "
      >
        <thead>
          <tr
            className="
              bg-base-200
              text-left
              text-sm
              font-semibold
            "
          >
            <th className="p-3">Nome</th>
            <th className="p-3">Função</th>
            <th className="p-3 text-center w-32">Ações</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="
                border-t
                border-base-300
                hover:bg-base-200
                transition
              "
            >
              {/* NOME */}
              <td className="p-3 text-sm">
                <div className="flex flex-col">
                  <span
                    className={`
                      font-medium
                      ${
                        member.termSigned
                          ? "text-base-content"
                          : "text-base-content/70"
                      }
                    `}
                  >
                    {member.name}
                  </span>

                  {!member.termSigned && (
                    <span
                      className="
                        text-xs
                        text-base-content/60
                      "
                    >
                      Termo pendente
                    </span>
                  )}
                </div>
              </td>

              {/* FUNÇÃO */}
              <td className="p-3 text-sm">
                {member.role}
              </td>

              {/* AÇÕES */}
              <td className="p-3 text-center">
                <div
                  className="
                    flex
                    justify-center
                    gap-1
                  "
                >
                  <button
                    onClick={() => onEdit(member.id)}
                    className="
                      btn
                      btn-ghost
                      btn-sm
                      focus:outline-none
                      focus:ring-0
                    "
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(member.id)}
                    className="
                      btn
                      btn-ghost
                      btn-sm
                      text-error
                      focus:outline-none
                      focus:ring-0
                    "
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
