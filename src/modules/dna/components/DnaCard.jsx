import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function DnaCard({ dna, canEdit, onEdit }) {
  const whatsapp =
    dna.whatsapp && dna.whatsapp.replace(/\D/g, "").length >= 10
      ? `https://wa.me/55${dna.whatsapp.replace(/\D/g, "")}`
      : null;

  const mapsLink = dna.endereco
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        dna.endereco
      )}`
    : null;

  return (
    <div
      className="
        rounded-xl
        border
        border-base-300
        bg-base-100
        p-4
        flex
        flex-col
        gap-2
        hover:shadow-md
        transition
      "
    >
      {/* NOME */}
      <h3 className="text-base font-semibold">
        {dna.nome}
      </h3>

      {/* DIA / HORÁRIO */}
      <p className="text-sm text-base-content/70">
        {dna.dia} • {dna.horario}
      </p>

      {/* ENDEREÇO */}
      {mapsLink && (
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          📍 {dna.endereco}
        </a>
      )}

      {/* LÍDER */}
      {dna.liderNome && (
        <p className="text-sm">
          👤 Líder: {dna.liderNome}
        </p>
      )}

      {/* AÇÕES */}
      <div className="flex items-center justify-between pt-3">
        {/* WHATSAPP ÍCONE */}
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-green-500
              hover:text-green-600
              transition
            "
            title="Falar no WhatsApp"
          >
            <FaWhatsapp size={22} />
          </a>
        )}

        {/* EDITAR */}
        {canEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}
