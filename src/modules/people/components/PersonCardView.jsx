import {
  FaUser,
  FaWhatsapp,
  FaRoute,
  FaEdit,
  FaMapMarkerAlt,
} from "react-icons/fa";

/**
 * Mapeamento de tipo salvo no banco → label humano
 */
const TIPO_LABEL = {
  visitante: "Visitante",
  novo_convertido: "Novo convertido",
  membro: "Membro",
};

export default function PersonCardView({
  person,
  nearestDna,
  whatsappLink,
  onEdit,
}) {
  const mapsLink = person.endereco?.texto
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        person.endereco.texto
      )}`
    : null;

  const tipoLabel =
    TIPO_LABEL[person.tipo] || "Pessoa";

  return (
    <>
      {/* BOTÃO EDITAR — MOBILE SEMPRE VISÍVEL / DESKTOP COM HOVER */}
      <button
        onClick={onEdit}
        className="
          absolute
          top-3
          right-3
          text-base-content/50
          hover:text-primary
          transition
          opacity-100
          sm:opacity-0
          sm:group-hover:opacity-100
        "
        aria-label="Editar pessoa"
      >
        <FaEdit size={14} />
      </button>

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-3
          sm:gap-6
        "
      >
        {/* BLOCO VISUAL */}
        <div
          className="
            flex
            flex-row
            sm:flex-col
            items-center
            sm:justify-center
            rounded-lg
            bg-base-200
            px-3
            py-2
            sm:px-4
            sm:py-3
            min-w-0
            sm:min-w-[72px]
            text-base-content/70
            gap-2
          "
        >
          <FaUser size={15} />
          <span className="text-[11px] uppercase">
            {tipoLabel}
          </span>
        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-2 flex-1">
          {/* NOME */}
          <h3 className="text-sm sm:text-base font-medium">
            {person.nome}
          </h3>

          {/* INFOS */}
          <div
            className="
              flex
              flex-wrap
              gap-3
              text-sm
              text-base-content/60
              items-center
            "
          >
            {nearestDna && (
              <span className="flex items-center gap-1">
                <FaRoute size={11} />
                {nearestDna.nome}
              </span>
            )}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-green-600
                  hover:text-green-700
                  transition
                "
                aria-label="Chamar no WhatsApp"
                title="Chamar no WhatsApp"
              >
                <FaWhatsapp size={14} />
              </a>
            )}
          </div>

          {/* ENDEREÇO — ÍCONE REAL + MAPS */}
          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-start
                gap-2
                text-sm
                text-primary
                hover:underline
              "
              aria-label="Abrir endereço no Google Maps"
              title="Abrir no Google Maps"
            >
              <FaMapMarkerAlt size={13} />
              <span className="leading-snug">
                {person.endereco.texto}
              </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
