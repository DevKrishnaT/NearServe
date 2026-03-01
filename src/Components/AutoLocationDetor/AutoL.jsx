import React, { useState } from "react";
import useTheme from "../../Context/Theme/ThemeContext";
import useLocation from "../../Context/Location/useLocation";

const AutoL = () => {
  const theme = useTheme((state) => state.theme);
  const setUserLocation = useLocation((state) => state.setUserLocation);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setUserLocation({ latitude, longitude }); // save to global state

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={detectLocation}
        className={`px-4  flex py-2 rounded-md font-semibold transition gap-1 items-center ${
          theme === "dark"
            ? "bg-darkPrimary text-white"
            : "bg-primary text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {loading ? "Detecting..." : "Use Your Current Location"}
      </button>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default AutoL;
