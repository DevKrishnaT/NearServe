import React, { useEffect, useState } from "react";

import LocationSelector  from "./isOpen/LocationSelector";
import useTheme from "../../../Context/Theme/ThemeContext";
import useLocation from "../../../Context/Location/useLocation";
import useLocationState from "../../../Context/Location/useRealLocation";

const Headerlocation = () => {
  const theme = useTheme((state) => state.theme);
  const togglelocationbar = useLocation((state) => state.togglelocationbar);
  const location = useLocationState((state) => state.location);
  const address = location?.address?.fullAddress || "";
  const neighbourhood = location?.address?.neighbourhood || "";

  return (
    <>
      <div
        className="col1 flex flex-col justify-center cursor-pointer"
        onClick={togglelocationbar}
      >
        <div className="location">
          <p
            className={`font-bold text-xl ${theme == "dark" ? "text-[#F1F5F9]" : "text-black"}`}
          >
            {neighbourhood}
          </p>
        </div>
        <div
          className={`text-sm flex items-center gap-1 ${theme == "dark" ? "text-[#F1F5F9]" : "text-black"} `}
        >
          <p className="line-clamp-1 w-55">{address}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      <LocationSelector />
    </>
  );
};

export default Headerlocation;
