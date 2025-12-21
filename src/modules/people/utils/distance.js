export function getDistanceKm(a, b) {
  const R = 6371; // raio da Terra em km

  const dLat = deg2rad(b.lat - a.lat);
  const dLng = deg2rad(b.lng - a.lng);

  const lat1 = deg2rad(a.lat);
  const lat2 = deg2rad(b.lat);

  const calc =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) *
    Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(calc), Math.sqrt(1 - calc));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
