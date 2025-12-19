import {
  FaWhatsapp,
  FaEdit,
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaRoute,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import JoinDnaModal from "./JoinDnaModal";

export default function DnaCard({ dna }) {
  const navigate = useNavigate();
  const [openJoin, setOpenJoin] = useState(false);

  const whatsappNumber =
    dna.whatsapp &&
    dna.whatsapp.replace(/\D/g, "").length >= 10
      ? `55${dna.whatsapp.replace(/\D/g, "")}`
      : null;

  const mapsLink = dna.endereco
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        dna.endereco
      )}`
    : null;

  function handleJoin({ name, whatsapp }) {
    const message = encodeURIComponent(
      `Olá, tudo bem? gostaria de participar do grupo DNA "${dna.nome}".\n` +
        `Poderia me orientar sobre os próximos passos?`
    );

    const link = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(link, "_blank");
    setOpenJoin(false);
  }

  return (
    <>
      <div
        className="
          group                          /* permite hover em elementos internos */
          rounded-2xl                    /* mesmo raio do VerseCard */
          bg-base-100                    /* fundo padrão do app */
          border                         /* borda padrão */
          border-base-300                /* cor neutra consistente */
          p-6                            /* espaçamento interno confortável */
          flex                           /* layout flexível */
          flex-col                       /* empilhamento vertical */
          gap-4                          /* espaçamento entre blocos */
          shadow-sm                      /* sombra leve padrão */
          transition                     /* animações suaves */
          hover:shadow-md                /* realce no hover */
          hover:border-primary/40        /* feedback visual sutil */
        "
      >
        {/* TÍTULO + EDITAR */}
        <div
          className="
            flex                         /* layout horizontal */
            items-start                  /* alinha topo */
            justify-between              /* separa título e ação */
            gap-3                        /* espaço entre eles */
          "
        >
          <h3
            className="
              text-base                  /* tamanho padrão de título de card */
              font-semibold              /* peso consistente */
            "
          >
            {dna.nome}
          </h3>

          <button
            onClick={() => navigate(`/dna/${dna.id}`)}
            className="
              text-base-content/40       /* ícone discreto */
              hover:text-primary         /* destaque no hover */
              opacity-0                  /* escondido por padrão */
              group-hover:opacity-100    /* aparece ao passar mouse */
              transition                 /* suavidade */
            "
            aria-label="Editar DNA"
          >
            <FaEdit size={14} />
          </button>
        </div>

        {/* DIA / HORÁRIO */}
        {(dna.dia || dna.horario) && (
          <div
            className="
              flex                       /* layout horizontal */
              items-center               /* centraliza verticalmente */
              gap-2                      /* espaço entre ícone e texto */
              text-sm                    /* texto padrão */
              text-base-content/80       /* contraste leve */
            "
          >
            <FaClock size={12} />
            <span>
              {dna.dia} • {dna.horario}
            </span>
          </div>
        )}

        {/* ENDEREÇO */}
        {mapsLink && (
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex                       /* layout horizontal */
              items-start                /* alinha topo do texto */
              gap-2                      /* espaço entre ícone e texto */
              text-sm                    /* tamanho padrão */
              text-primary               /* cor de ação */
              hover:underline            /* feedback claro */
            "
          >
            <FaMapMarkerAlt size={13} />
            <span>{dna.endereco}</span>
          </a>
        )}

        {/* DISTÂNCIA */}
        {typeof dna.distance === "number" && (
          <div
            className="
              flex                       /* layout horizontal */
              items-center               /* centraliza verticalmente */
              gap-2                      /* espaço entre ícone e texto */
              text-sm                    /* tamanho padrão */
              text-base-content/70       /* informação secundária */
            "
          >
            <FaRoute size={13} />
            <span>{dna.distance.toFixed(1)} km de você</span>
          </div>
        )}

        {/* LÍDER */}
        {dna.liderNome && (
          <div
            className="
              flex                       /* layout horizontal */
              items-center               /* centraliza verticalmente */
              gap-2                      /* espaço entre ícone e texto */
              text-sm                    /* tamanho padrão */
              text-base-content/80       /* boa legibilidade */
            "
          >
            <FaUser size={13} />
            <span>
              Liderado por{" "}
              <strong className="font-medium">
                {dna.liderNome}
              </strong>
            </span>
          </div>
        )}

        {/* AÇÃO */}
        {whatsappNumber && (
          <div
            className="
              pt-4                       /* separação do conteúdo */
              mt-auto                    /* empurra para o final do card */
              border-t                   /* divisor visual */
              border-base-200            /* divisor suave */
            "
          >
            <button
              onClick={() => setOpenJoin(true)}
              className="
                flex                     /* layout horizontal */
                items-center             /* centraliza verticalmente */
                gap-3                    /* espaço entre ícone e texto */
                w-full                   /* ocupa toda largura */
                rounded-lg               /* padrão ghost */
                border                   /* botão ghost */
                border-base-300           /* borda neutra */
                px-3                     /* padding horizontal */
                py-2                     /* padding vertical */
                text-sm                  /* texto padrão */
                font-medium              /* peso médio */
                transition               /* animação suave */
                hover:bg-base-200        /* hover ghost */
                active:scale-[0.98]      /* feedback de clique */
              "
            >
              <FaWhatsapp size={16} />
              <span className="flex-1 text-left">
                Quero participar
              </span>
            </button>
          </div>
        )}
      </div>

      <JoinDnaModal
        open={openJoin}
        onClose={() => setOpenJoin(false)}
        onConfirm={handleJoin}
        dnaName={dna.nome}
      />
    </>
  );
}
