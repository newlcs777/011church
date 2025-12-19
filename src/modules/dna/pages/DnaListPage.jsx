import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

import useDna from "../hooks/useDna";
import useDnaSearch from "../hooks/useDnaSearch";

import DnaCard from "../components/DnaCard";

export default function DnaListPage() {
  const navigate = useNavigate();

  const { getAll } = useDna();
  const { searchNearby } = useDnaSearch();

  const [allDnas, setAllDnas] = useState([]);
  const [filteredDnas, setFilteredDnas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getAll();
      setAllDnas(data);
      setLoading(false);
    }

    load();
  }, [getAll]);

  async function handleSearchNearby() {
    if (!("geolocation" in navigator)) {
      setGeoError(
        "Seu dispositivo não permite usar a localização."
      );
      setSearched(true);
      return;
    }

    setSearching(true);
    setGeoError(null);

    try {
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permission.state === "denied") {
          setGeoError(
            "Para encontrar um grupo perto de você, é necessário permitir o acesso à localização nas configurações do navegador."
          );
          setSearching(false);
          setSearched(true);
          return;
        }
      }
    } catch {
      // Safari iOS segue fluxo normal
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const result = await searchNearby(userLocation);
        setFilteredDnas(result);
        setSearching(false);
        setSearched(true);
      },
      () => {
        setGeoError(
          "Não foi possível acessar sua localização agora. Você pode ver todos os grupos disponíveis."
        );
        setSearching(false);
        setSearched(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  const listToRender = searched ? filteredDnas : allDnas;

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        pb-6
      "
    >
      {/* HEADER */}
      <PageHeader
        title="Grupos DNA"
        subtitle="Pequenos grupos para caminhar juntos, criar comunhão e crescer na fé"
        right={
          <Button
            variant="ghost"
            onClick={() => navigate("/dna")}
          >
            Voltar
          </Button>
        }
      />

      {/* AÇÃO ADMIN */}
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => navigate("/dna/novo")}
          className="
            flex
            items-center
            gap-3
            text-sm
          "
        >
          <FaPlus className="opacity-70" />
          Criar DNA
        </Button>
      </div>

      {/* CTA PRINCIPAL */}
      <section
        className="
          flex
          flex-col
          items-center
          gap-3
          text-center
          pt-2
        "
      >
        <button
          type="button"
          onClick={handleSearchNearby}
          disabled={searching}
          className="
            flex
            items-center
            justify-center
            gap-3
            w-full
            max-w-md
            rounded-lg
            border
            border-base-300
            px-4
            py-2.5
            text-sm
            font-medium
            transition
            hover:bg-base-200
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <FaMapMarkerAlt className="opacity-70" />
          Encontrar um grupo perto de mim
        </button>

        {/* ERRO GEO */}
        {geoError && (
          <p className="text-xs text-warning max-w-xs">
            {geoError}
          </p>
        )}

        {/* RESET */}
        {searched && !geoError && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearched(false);
              setFilteredDnas([]);
            }}
          >
            Ver todos os grupos
          </Button>
        )}
      </section>

      {/* FEEDBACK */}
      {loading && (
        <p className="text-sm text-base-content/60 text-center">
          Carregando grupos DNA...
        </p>
      )}

      {searching && (
        <p className="text-sm text-primary text-center">
          Procurando grupos próximos de você...
        </p>
      )}

      {!loading &&
        !searching &&
        searched &&
        listToRender.length === 0 && (
          <p className="text-sm text-base-content/60 text-center">
            Ainda não encontramos um grupo próximo, mas você é
            muito bem-vindo em qualquer um deles.
          </p>
        )}

      {/* LISTA */}
      {!loading && (
        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {listToRender.map((dna) => (
            <DnaCard key={dna.id} dna={dna} />
          ))}
        </div>
      )}
    </div>
  );
}
