export const detectLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        const data = await res.json();

        const locationData = {
          latitude,
          longitude,
          address: data.display_name,
        };

        localStorage.setItem(
          "userLocation",
          JSON.stringify(locationData)
        );

        resolve(locationData);
      },
      (err) => {
        const stored = localStorage.getItem("userLocation");

        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          reject(err.message);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
};