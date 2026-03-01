import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import useLocation from "../../../Context/Location/useLocation";

const LocationSelector = () => {
  const theme = useTheme((state) => state.theme);
  const islocationOpen = useLocation((state) => state.islocationOpen);
  const togglelocationbar = useLocation((state) => state.togglelocationbar);
  return (
    <div
      className={`${islocationOpen ? "fixed inset-0" : "hidden"} z-50 ${
        theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"
      }`}
    >
      <div className="">
        <button className="h-10 w-10 border bg-red" onClick={togglelocationbar}>
          close
        </button>
      </div>
    </div>
  );
};

export default LocationSelector;
