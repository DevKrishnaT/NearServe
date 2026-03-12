import React, { useState } from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";

import { DetectLocation } from "../../../../Context/Location/detectLocation";
import useLocationState from "../../../../Context/Location/useRealLocation";
import useLocation from "../../../../Context/Location/useLocation";


const AutoL = () => {
  const theme = useTheme((state) => state.theme);
  const setUserLocation = useLocationState((state) => state.setUserLocation);
  const togglelocationbar = useLocation((state) => state.togglelocationbar);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
    const handleDetectLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const location = await DetectLocation();

      setUserLocation(location); 
      togglelocationbar();

    } catch (err) {
        setError(err.message || "Failed to detect location");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleDetectLocation}
        className={`flex py-2 rounded-md font-semibold transition gap-1 items-center ${
          theme === "dark"
            ? " text-[#F1F5F9]"
            : " text-[#0F172A]"
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
