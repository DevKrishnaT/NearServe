export const suggestionData = async (value) => {
  if (!value) {
    throw new Error("value not given");
  }

  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${apiKey}`
  );

  const data = await res.json();

  return data.features || [];
};