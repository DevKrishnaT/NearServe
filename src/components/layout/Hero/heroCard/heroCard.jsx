import React from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";

const HeroCard = () => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="px-6 py-8 flex flex-col gap-6 w-150">
      {/* Heading */}
      <div className="flex flex-col gap-4 text-left">
        <h1
          className={`text-4xl font-bold leading-tight ${
            isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"
          }`}
        >
          Find Trusted <span className="text-[#296dda]">Local Services</span>{" "}
          <span className="whitespace-nowrap">Near You</span>
        </h1>

        <p
          className={`text-lg leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Book verified professionals in{" "}
          <span className="text-[#296dda] font-medium">minutes</span>, from home
          repairs to tutoring — all around your{" "}
          <span className="text-[#296dda] font-medium">neighborhood.</span>
        </p>
      </div>

      <div
        className={`rounded-xl border px-4 py-4 flex flex-col gap-4 ${
          isDark
            ? "border-slate-700 bg-slate-900/40"
            : "border-gray-200 bg-white"
        }`}
      >
        
        <div
          className={`flex flex-wrap gap-2 text-sm items-center ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <span className="font-medium">Popular:</span>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition">
            Plumber
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition">
            Electrician
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition">
            Cleaning
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition">
            Tutor
          </span>
        </div>

        
        <div
          className={`h-px w-full ${isDark ? "bg-slate-700" : "bg-gray-200"}`}
        />

      
        <div
          className={`flex flex-wrap gap-6 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="flex items-center gap-1">
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
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            4.8 Average Rating
          </span>
          <span className="flex items-center gap-1">
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
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            Verified Professionals
          </span>
          <span className="flex items-center gap-1">
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
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
            Book in Minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
