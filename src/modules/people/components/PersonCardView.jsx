import {
  FaEdit,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaDna,
} from "react-icons/fa";

import PersonStatusBadge from "./PersonStatusBadge";

export default function PersonCardView({
  person,
  nearestDna,
  whatsappLink,
  onEdit,
}) {
  return (
    <>
      {/* HEADER (igual DNA) */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <h3
          className="
            text-base
            font-semibold
          "
        >
          {person.nome}
        </h3>

        <button
          onClick={onEdit}
          className="
            text-base-content/40
            hover:text-primary
            opacity-0
            group-hover:opacity-100
            transition
          "
          aria-label="Editar pessoa"
        >
          <FaEdit size={14} />
        </button>
      </div>

      {/* STATUS (discreto, não full width) */}
      <div>
        <PersonStatusBadge status={person.tipo} />
      </div>

      {/* ENDEREÇO (linha única, igual DNA) */}
      {person.endereco && (
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-base-content/80
          "
        >
          <FaMapMarkerAlt size={12} className="opacity-70" />
          <span>
            {person.endereco.texto}
            {person.endereco.numero &&
              `, ${person.endereco.numero}`}
          </span>
        </div>
      )}

      {/* DNA (linha única) */}
      {nearestDna && (
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-primary
          "
        >
          <FaDna size={12} className="opacity-70" />
          <span>
            <strong className="font-medium">
              {nearestDna.nome}
            </strong>
            {typeof nearestDna.distance === "number" && (
              <span className="text-base-content/60">
                {" "}
                ({nearestDna.distance.toFixed(1)} km)
              </span>
            )}
          </span>
        </div>
      )}

      {/* LÍDER (linha simples, sem quebra) */}
      {nearestDna?.liderNome && (
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-base-content/80
          "
        >
          <FaUser size={12} className="opacity-70" />
          <span>
            Liderado por{" "}
            <strong className="font-medium">
              {nearestDna.liderNome}
            </strong>
          </span>
        </div>
      )}

      {/* WHATSAPP (link simples, igual endereço) */}
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            items-center
            gap-2
            text-sm
            text-primary
            hover:underline
          "
        >
          <FaPhone size={12} className="opacity-70" />
          <span>{person.telefone}</span>
        </a>
      )}
    </>
  );
}
