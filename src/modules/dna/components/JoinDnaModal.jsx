import Button from "@/components/ui/Button";

export default function JoinDnaModal({
  open,
  onClose,
  onConfirm,
  dnaName,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        px-4
      "
    >
      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-sm
          bg-base-100
          rounded-2xl
          p-6
          flex
          flex-col
          gap-5
        "
      >
        {/* TÍTULO */}
        <h2
          className="
            text-base
            font-semibold
            text-center
          "
        >
          Participar de um DNA
        </h2>

        {/* TEXTO */}
        <p
          className="
            text-sm
            text-base-content/70
            text-center
            leading-relaxed
          "
        >
          Que alegria 💙
          <br />
          Você deseja participar do DNA
          <br />
          <strong className="text-base-content font-medium">
            {dnaName}
          </strong>
          ?
          <br />
          <br />
          O líder do grupo entrará em contato com você
          pelo WhatsApp após a aprovação.
        </p>

        {/* AÇÕES */}
        <div
          className="
            flex
            justify-center
            gap-3
            pt-2
          "
        >
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="
              text-base-content/60
              hover:text-base-content
            "
          >
            Voltar
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onConfirm}
            loading={loading}
            className="
              border
              border-base-300
              hover:bg-base-200
              font-medium
            "
          >
            Confirmar pedido
          </Button>
        </div>

        {/* RODAPÉ */}
        <p
          className="
            text-xs
            text-base-content/50
            text-center
          "
        >
          Seu pedido ficará pendente até a aprovação do líder.
        </p>
      </div>
    </div>
  );
}
