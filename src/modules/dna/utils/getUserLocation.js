export function getUserLocation() {
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
      (err) => {
        console.warn("Permissão negada ou erro:", err);
        reject(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
}
