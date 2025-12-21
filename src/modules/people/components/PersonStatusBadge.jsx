export default function PersonStatusBadge({ status }) {
  if (!status) return null;

  const map = {
    visitante: {
      label: "Visitante",
      classes: `
        bg-primary/10
        text-primary
        border-primary/20
      `,
    },
    novo_convertido: {
      label: "Novo convertido",
      classes: `
        bg-success/10
        text-success
        border-success/20
      `,
    },
    membro: {
      label: "Membro",
      classes: `
        bg-base-200
        text-base-content
        border-base-300
      `,
    },
  };

  const cfg = map[status] || {
    label: status,
    classes: `
      bg-base-200
      text-base-content
      border-base-300
    `,
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-0.5
        text-[11px]
        font-medium
        ${cfg.classes}
      `}
    >
      {cfg.label}
    </span>
  );
}
