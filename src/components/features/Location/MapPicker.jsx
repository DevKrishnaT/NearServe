import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapPicker = ({ onSelect, autoLocation }) => {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    const map = L.map("map").setView(
      autoLocation?.lat ? [autoLocation.lat, autoLocation.lng] : [20.5937, 78.9629],
      autoLocation?.lat ? 15 : 5
    );

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`
    ).addTo(map);

    let marker;

    // 🔥 If auto location exists → place marker
    if (autoLocation?.lat) {
      marker = L.marker([autoLocation.lat, autoLocation.lng]).addTo(map);
    }

    const handleSelect = async (lat, lng) => {
      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lng]).addTo(map);

      try {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
        );
        const data = await res.json();

        const address = data.features[0]?.properties?.formatted;

        onSelect({
          address: address || `${lat}, ${lng}`,
          lat,
          lng,
        });
      } catch {
        onSelect({
          address: `${lat}, ${lng}`,
          lat,
          lng,
        });
      }
    };

    map.on("click", (e) => {
      handleSelect(e.latlng.lat, e.latlng.lng);
    });

    return () => map.remove();
  }, [autoLocation]);

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border">
      <div id="map" className="w-full h-full"></div>
    </div>
  );
};

export default MapPicker;