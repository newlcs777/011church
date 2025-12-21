export async function geocodeAddress(address) {
  if (!address) return null;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}&limit=1`;

  const res = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "User-Agent": "011ChurchApp/1.0 (contato@011church.com)",
      "Referer": window.location.origin,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao consultar serviço de geolocalização");
  }

  const data = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
  };
}
