import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function DnaLocationSearch({ endereco, onLocationFound }) {
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!endereco || endereco.trim().length < 5) {
      alert("Informe o endereço primeiro");
      return;
    }

    setLoading(true);

    try {
      // EXEMPLO usando API de geocoding (mock ou real)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          endereco
        )}`
      );

      const data = await response.json();

      if (!data.length) {
        alert("Endereço não encontrado");
        return;
      }

      const location = {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };

      onLocationFound(location);
    } catch (err) {
      alert("Erro ao buscar localização");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Buscando..." : "Buscar localização"}
      </Button>
    </div>
  );
}
