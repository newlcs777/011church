import { getDnas } from "../services/dnaService";
import { getDistanceKm } from "../utils/distance";

/**
 * 📍 Geolocalização do navegador
 */
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => reject(null),
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
}

export default function useDnaSearch() {
  async function searchNearby() {
    const userLocation = await getUserLocation();
    if (!userLocation) return [];

    const dnas = await getDnas();

    return dnas
      .filter((dna) => dna.location)
      .map((dna) => ({
        ...dna,
        distance: getDistanceKm(userLocation, {
          lat: Number(dna.location.lat),
          lng: Number(dna.location.lng),
        }),
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  return { searchNearby };
}
