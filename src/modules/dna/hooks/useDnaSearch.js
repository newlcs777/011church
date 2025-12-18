// modules/dna/hooks/useDnaSearch.js
import { geocodeAddress } from "../services/geoService";
import { getDistanceKm } from "../utils/distance";
import { getDnas } from "../services/dnaService";

/* ===============================
   LOCALIZAÇÃO DO USUÁRIO (SAFE)
================================ */
function getUserLocationSafe(timeout = 8000) {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        resolve(null); // ❗ nunca rejeita
      },
      { timeout }
    );
  });
}

export default function useDnaSearch() {
  /* ===============================
     🔎 BUSCA POR ENDEREÇO
  ============================== */
  async function searchByAddress(address) {
    if (!address) return [];

    const userLocation = await geocodeAddress(address);
    if (!userLocation) return [];

    const dnas = await getDnas();

    return dnas
      .filter((dna) => dna.location)
      .map((dna) => ({
        ...dna,
        distance: getDistanceKm(userLocation, dna.location),
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  /* ===============================
     📍 BUSCA POR GPS (CORRETA)
  ============================== */
  async function searchNearby() {
    const userLocation = await getUserLocationSafe();
    const dnas = await getDnas();

    // ❌ GPS indisponível → retorna lista, mas sinaliza
    if (!userLocation) {
      return dnas.map((dna) => ({
        ...dna,
        distance: null,
        gpsUnavailable: true,
      }));
    }

    // ✅ GPS OK → calcula distância
    return dnas
      .filter((dna) => dna.location)
      .map((dna) => ({
        ...dna,
        distance: getDistanceKm(userLocation, dna.location),
        gpsUnavailable: false,
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  return {
    searchByAddress,
    searchNearby,
  };
}
