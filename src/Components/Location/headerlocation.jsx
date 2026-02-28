import React from "react";
import useTheme from "../../Context/Theme/ThemeContext";

const Headerlocation = () => {
  const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);
  return (
    <div className="col1">
      <div className="location">
        <p className={`font-bold text-xl ${theme == "dark" ? "text-[#F1F5F9]" : "text-black"}`}>Singhpur</p>
      </div>
      <div className={`text-sm flex items-center gap-1 ${theme == "dark" ? "text-[#F1F5F9]" : "text-black"}`}>
        <p>GPT +1213 ROAD DASH AREA</p>
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
  );
};

export default Headerlocation;
