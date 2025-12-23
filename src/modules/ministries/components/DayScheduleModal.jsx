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

  const canManage =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider" ||
    user?.role === "obreiro";

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
        items-center
        justify-center
        px-3
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-md
          bg-base-100
          rounded-2xl
          shadow-xl
          p-4
          sm:p-5
          -mt-16
          sm:mt-0
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base sm:text-lg font-semibold">
              Escala deste dia
            </h3>

            <p className="text-xs sm:text-sm text-base-content/60 capitalize">
              {formattedDate}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              h-8
              w-8
              inline-flex
              items-center
              justify-center
              rounded-full
              text-base-content/60
              hover:bg-base-200
              transition
            "
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="border-b border-base-200 mb-3" />

        {/* AVISO */}
        {!canManage && (
          <p className="text-xs text-center text-base-content/50 mb-4">
            Você pode apenas visualizar a escala deste dia.
          </p>
        )}

        {/* LISTA */}
        {schedules.length === 0 ? (
          <div className="py-6 text-center text-sm text-base-content/50">
            Ainda não há ninguém escalado aqui.
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-4">
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
                  text-sm
                "
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {getMemberName(s.memberId)}
                  </span>

                  {s.cult && (
                    <span className="text-xs text-base-content/60">
                      Culto: {s.cult}
                    </span>
                  )}
                </div>

                {canManage && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(s.id)}
                      className="
                        inline-flex
                        items-center
                        px-2
                        py-1
                        text-xs
                        rounded-lg
                        text-base-content/70
                        hover:bg-base-200
                      "
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
                      className="
                        inline-flex
                        items-center
                        px-2
                        py-1
                        text-xs
                        rounded-lg
                        text-error
                        hover:bg-base-200
                      "
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
          {canManage && (
            <button
              onClick={() => {
                onClose();
                onCreate(date);
              }}
              className="
                inline-flex
                items-center
                justify-center
                flex-1
                h-9
                rounded-lg
                border
                border-base-300
                text-sm
                text-base-content/70
                transition
                hover:bg-base-200
                active:scale-[0.98]
              "
            >
              + Criar escala
            </button>
          )}

          <button
            onClick={onClose}
            className="
              inline-flex
              items-center
              justify-center
              flex-1
              h-9
              rounded-lg
              text-sm
              text-base-content/70
              transition
              hover:bg-base-200
            "
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
