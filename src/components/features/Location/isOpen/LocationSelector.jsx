import React, { useState } from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import useLocation from "../../../../Context/Location/useLocation";
import Inputbox from "../../../ui/Inputbox";
import AutoL from "../AutoLocationDetor/AutoL";
import CurrAdress from "../CurrentAdress/CurrAdress";
import { suggestionData } from "../../../../Context/Location/SuggestAdress";

const LocationSelector = () => {
  const theme = useTheme((state) => state.theme);
  const islocationOpen = useLocation((state) => state.islocationOpen);
  const togglelocationbar = useLocation((state) => state.togglelocationbar);
  const [suggestion, setSuggestions] = useState([]);
  const [data, setdata] = useState("");
  const border = "border  w-full h-8 p-2";

  const HandelInputChange = async (value) => {
    setdata(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const features = await suggestionData(value);
      setSuggestions(features);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };
  const handleSelect = (value) => {
    const props = value.properties;
    console.log(props);

    const address = {
      city: props.city,
      fullAddress: props.address_line2,
      neighbourhood: props.name || props.district || props.city,
      pincode: props.postcode,
      state: props.state,
    };

    const location = {
      address: address,
      latitude: props.lat,
      longitude: props.lon,
    };
    console.log(location);

    localStorage.setItem("userLocation", JSON.stringify(location));

    setdata("");
    setSuggestions([]);
  };
  return (
    <>
      <div
        className={`${islocationOpen ? "fixed inset-0" : "hidden"} z-50 bg-black/40`}
      ></div>
      <div
        className={`${islocationOpen ? "fixed inset-0" : "hidden"} z-50 ${
          theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"
        }  px-4 py-4 flex flex-col lg:w-120  lg:h-90 lg:top-24 lg:left-25`}
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
              <input
                type="text"
                placeholder="Enter your location"
                value={data}
                onChange={(e) => HandelInputChange(e.target.value)}
                className={`border ${suggestion ? "rounded-t-2xl" : "rounded-2xl"} h-12 w-full p-2 ${theme == "dark" ? "border-white placeholder-white text-white" : "border-black placeholder-black text-black"}`}
              />
              {suggestion.length > 0 && (
                <div
                  className={`border w-full max-h-60 overflow-y-auto ${
                    theme === "dark"
                      ? "bg-[#1E293B] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {suggestion.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => handleSelect(item)}
                    >
                      {item.properties.formatted}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="auto">
              <AutoL />
            </div>
          </div>
          <CurrAdress />
        </div>
      </div>
    </>
  );
};

export default LocationSelector;
