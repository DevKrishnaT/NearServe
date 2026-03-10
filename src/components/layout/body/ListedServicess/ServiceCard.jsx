import React from "react";
import img from "../../../../uploads/test.png";
import useTheme from "../../../../Context/Theme/ThemeContext";

const ServiceCard = ({
  title,
  discription,
  provider,
  distance,
  price,
  eta,
  verified
}) => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`
      ${isDark ? "bg-[#1E293B] text-[#F1F5F9]" : "bg-[#F8FAFC] text-[#0F172A]"}
      rounded-2xl overflow-hidden
      border border-[#E2E8F0] dark:border-[#334155]
      hover:shadow-lg transition duration-200
      flex flex-col
      `}
    >
      
      <div className="h-44 w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

    
      <div className="p-4 flex flex-col gap-2">

      
        <h3 className="font-semibold text-lg truncate">
          {title}
        </h3>

        <span className="">{discription}</span>

      
        <p className="text-sm opacity-70 truncate">
          {provider}
        </p>

       
        <div className="flex items-center justify-between text-sm opacity-80">
          <span>📍 {distance} km away</span>
          {eta && <span>⏱ {eta}</span>}
        </div>

        
        {verified && (
          <span className="text-xs text-green-500 font-medium">
            ✔ Verified Provider
          </span>
        )}

      
        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-primary">
            ₹{price} onwards
          </span>
        </div>

        
        <button
          className={`
          w-full h-9 mt-2 rounded-xl font-medium
          transition
          ${
            isDark
              ? "bg-[#334155] hover:bg-[#3b4a63] text-white"
              : "bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
          }
          `}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;