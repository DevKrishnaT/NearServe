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
  verified,
}) => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`
      ${isDark ? "bg-[#1E293B] text-[#F1F5F9]" : "bg-[#F8FAFC] text-[#0F172A]"}
      rounded-2xl overflow-hidden
       border-[#E2E8F0] dark:border-[#334155]
      hover:shadow-lg transition duration-200
      flex flex-col
      `}
    >
      <div className="h-44 w-full overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg truncate">{title}</h3>

        <span className="text-md line-clamp-2 ">{discription}</span>

        <p className="text-sm opacity-70 truncate">{provider}</p>

        <div className="flex items-center justify-between text-sm opacity-80">
          <span className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 0C149.3 0 64 85.3 64 192c0 36.9 11 65.4 30.1 94.3l141.7 215c4.3 6.5 11.7 10.7 20.2 10.7s16-4.3 20.2-10.7l141.7-215C437 257.4 448 228.9 448 192C448 85.3 362.7 0 256 0zm0 298.6c-58.9 0-106.7-47.8-106.7-106.8S197.1 85 256 85c58.9 0 106.7 47.8 106.7 106.8S314.9 298.6 256 298.6z"
              />
            </svg>{" "}
            {distance} km away
          </span>
          {eta && (
            <span className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M9.06 9.06c.271-.271.439-.646.439-1.06s-.168-.789-.439-1.06c-.59-.59-6.72-4.6-6.72-4.6s4 6.13 4.59 6.72a1.497 1.497 0 0 0 2.13 0z"
                />
                <path
                  fill="currentColor"
                  d="M8 0v3h1V1.59c3.153.495 5.536 3.192 5.536 6.445a6.52 6.52 0 1 1-12.07-3.423L1.55 3.29A7.94 7.94 0 0 0 .017 8a8 8 0 1 0 8-8H8z"
                />
              </svg>{" "}
              {eta}
            </span>
          )}
        </div>

        {verified && (
          <span className="text-xs text-green-500 font-medium flex gap-1 items-center">
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15.67 7.066l-1.08-1.34a1.5 1.5 0 0 1-.309-.77l-.19-1.698a1.51 1.51 0 0 0-1.329-1.33l-1.699-.19c-.3-.03-.56-.159-.78-.329L8.945.33a1.504 1.504 0 0 0-1.878 0l-1.34 1.08a1.5 1.5 0 0 1-.77.31l-1.698.19c-.7.08-1.25.63-1.33 1.329l-.19 1.699c-.03.3-.159.56-.329.78L.33 7.055a1.504 1.504 0 0 0 0 1.878l1.08 1.34c.17.22.28.48.31.77l.19 1.698c.08.7.63 1.25 1.329 1.33l1.699.19c.3.03.56.159.78.329l1.339 1.08c.55.439 1.329.439 1.878 0l1.34-1.08c.22-.17.48-.28.77-.31l1.698-.19c.7-.08 1.25-.63 1.33-1.329l.19-1.699c.03-.3.159-.56.329-.78l1.08-1.339a1.504 1.504 0 0 0 0-1.878zM6.5 12.01L3 8.51l1.5-1.5l2 2l5-5L13 5.56l-6.5 6.45z"
                fill="currentColor"
              />
            </svg>{" "}
            Verified Provider
          </span>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-primary">₹{price} onwards</span>
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
