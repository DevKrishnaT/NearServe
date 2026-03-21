export const LocationToLatLng = async (address) => {
  if (!address) {
    throw new Error("Address not provided");
  }

  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`
  );

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    return null;
  }

  const { lat, lon } = data.features[0].properties;

  return {
    lat,
    lng: lon,
  };
};