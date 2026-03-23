export const DetectLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
        // const res = await fetch(
        //   `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`,
        // );
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`,
        );

        const data = await res.json();

        const prop = data?.features?.[0]?.properties;
        console.log(prop);

        if (!prop) {
          reject("Location not found");
          return;
        }

        const address = {
          fullAddress: prop.formatted,
          city: prop.city || prop.town || prop.village,
          neighbourhood:
            prop.suburb || prop.neighbourhood || prop.district || prop.city,
          state: prop.state,
          pincode: prop.postcode,
        };

        const locationData = {
          latitude,
          longitude,
          address,
        };

        localStorage.setItem("userLocation", JSON.stringify(locationData));

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
      },
    );
  });
};
