import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function DayScheduleModal({
  date,
  schedules = [],
  getMemberName,
  onClose,
  onCreate,
  onEdit,
  onRemove,
}) {
  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        flex
        items-end
        sm:items-center
        justify-center
        px-2
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          sm:max-w-md
          bg-base-100
          rounded-t-3xl
          sm:rounded-2xl
          shadow-2xl
          p-5
          animate-fade-in
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-bold">
              Escala do dia
            </h3>

            <p className="text-sm text-base-content/60 capitalize">
              {formattedDate}
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm rounded-full"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="divider my-2" />

        {/* AVISO PARA LEITURA */}
        {!canEdit && (
          <p className="text-xs text-center text-base-content/50 mb-3">
            Visualização somente leitura
          </p>
        )}

        {/* CONTEÚDO */}
        {schedules.length === 0 ? (
          <div className="py-6 text-center text-sm text-base-content/60">
            Nenhuma pessoa escalada neste dia.
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-5">
            {schedules.map((s) => (
              <div
                key={s.id}
                className="
                  flex
                  items-center
                  justify-between
                  border
                  border-base-300
                  rounded-xl
                  p-3
                  transition
                  hover:bg-base-200
                "
              >
                {/* INFO */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {getMemberName(s.memberId)}
                  </span>

                  {s.cult && (
                    <span className="text-xs text-base-content/60">
                      Culto: {s.cult}
                    </span>
                  )}
                </div>

                {/* AÇÕES (SÓ GESTÃO) */}
                {canEdit && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(s.id)}
                      className="btn btn-ghost btn-xs"
                    >
                      Editar
                    </button>

                    <button
                      onClick={async () => {
                        const ok = window.confirm(
                          "Deseja remover esta pessoa da escala?"
                        );
                        if (!ok) return;

                        await onRemove(s.id);
                        onClose();
                      }}
                      className="btn btn-ghost btn-xs text-error"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex gap-2">
          {canEdit && (
            <button
              onClick={() => {
                onClose();
                onCreate(date);
              }}
              className="btn btn-outline btn-sm flex-1"
            >
              + Adicionar pessoa
            </button>
          )}

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm flex-1"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
