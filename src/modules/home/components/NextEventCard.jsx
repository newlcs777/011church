import Card from "../../../components/ui/Card";
import { FaMapMarkerAlt } from "react-icons/fa";

const MAPS_LINK =
  "https://www.google.com/maps/dir//Estr.+de+Itapecerica,+1449+-+Vila+das+Belezas,+São+Paulo+-+SP,+05835-005/@-23.6879872,-46.7992576,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94ce51001760dffd:0x13e31a96301eeedd!2m2!1d-46.7477551!2d-23.6480612";

export default function NextEventCard({ loading = false }) {
  /* ===============================
     SKELETON
  =============================== */
  if (loading) {
    return (
      <div
        className="
          rounded-2xl
          bg-base-100
          border
          border-base-300
          p-6
          shadow-sm
          animate-pulse
        "
      >
        {/* TITLE */}
        <div className="h-4 w-40 bg-base-200 rounded mb-2" />

        {/* SUBTITLE */}
        <div className="h-3 w-52 bg-base-200 rounded mb-4" />

        <div className="space-y-3">
          <div className="h-4 w-32 bg-base-200 rounded" />
          <div className="h-4 w-48 bg-base-200 rounded" />
          <div className="h-3 w-36 bg-base-200 rounded" />
        </div>
      </div>
    );
  }

  /* ===============================
     CONTEÚDO
  =============================== */
  return (
    <a
      href={MAPS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline text-inherit font-inherit"
    >
      <Card
        title="Próximo culto"
        subtitle="Será uma alegria receber você"
        className="animate-fadeInUp"
      >
        <div
          className="
            flex
            flex-col
            gap-3
            text-sm
          "
        >
          {/* QUANDO */}
          <div
            className="
              font-semibold
              text-base-content
              animate-fadeIn
              delay-75
            "
          >
            Domingo · 10h e 18h
          </div>

          {/* ONDE — ÍCONE IGUAL AO APP */}
          <div
            className="
              flex
              items-center
              gap-2
              text-base-content/70
              animate-fadeIn
              delay-100
            "
          >
            <FaMapMarkerAlt
              size={13}
              className="
                text-primary
              "
            />
            <span className="text-primary">
              011 Church · Capão Redondo
            </span>
          </div>

          {/* CONVITE */}
          <div
            className="
              text-xs
              text-primary
              font-medium
              animate-fadeIn
              delay-150
            "
          >
            Ver rota até a igreja
          </div>
        </div>
      </Card>
    </a>
  );
}
