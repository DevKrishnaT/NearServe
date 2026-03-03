import React from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import useLocation from "../../../../Context/Location/useLocation";
import Inputbox from "../../../ui/Inputbox";
import AutoL from "../AutoLocationDetor/AutoL";
import CurrAdress from "../CurrentAdress/CurrAdress";


const LocationSelector = () => {
  const theme = useTheme((state) => state.theme);
  const islocationOpen = useLocation((state) => state.islocationOpen);
  const togglelocationbar = useLocation((state) => state.togglelocationbar);
  return (
    <div
      className={`${islocationOpen ? "fixed inset-0" : "hidden"} z-50 ${
        theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"
      }  px-4 py-4 flex flex-col `}
    >
      <div className="flex flex-col gap-2">
        <div className="upperSeaction flex justify-between items-center">
          <button
            className={`h-10 w-10 ${theme == "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"} `}
            onClick={togglelocationbar}
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <p
            className={`text-xl font-bold ${theme == "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"}`}
          >
            Select Your Location
          </p>
        </div>
        <div className="location flex flex-col gap-2">
          <div className="manual">
            <Inputbox placeholderText={"Enter your location"} />
          </div>
          <div className="auto">
            <AutoL />
          </div>
        </div>
        <CurrAdress/>
      </div>
    </div>
  );
};

export default LocationSelector;
