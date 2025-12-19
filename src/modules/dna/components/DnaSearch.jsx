import { getDnas } from "../services/dnaService";
import { getDistanceKm } from "../utils/distance";

const MAX_DISTANCE_KM = 50;

export default function useDnaSearch() {
  async function searchNearby(userLocation) {
    if (
      !userLocation ||
      typeof userLocation.lat !== "number" ||
      typeof userLocation.lng !== "number"
    ) {
      return [];
    }

    const dnas = await getDnas();

    return dnas
      .map((dna) => {
        if (!dna.location) return null;

        const lat = Number(
          dna.location.lat ?? dna.location.latitude
        );
        const lng = Number(
          dna.location.lng ?? dna.location.longitude
        );

        if (Number.isNaN(lat) || Number.isNaN(lng)) {
          return null;
        }

        const distance = getDistanceKm(userLocation, {
          lat,
          lng,
        });

        return {
          ...dna,
          distance,
        };
      })
      .filter(
        (dna) =>
          dna !== null &&
          typeof dna.distance === "number" &&
          dna.distance <= MAX_DISTANCE_KM
      )
      .sort((a, b) => a.distance - b.distance);
  }

  return { searchNearby };
}
