import React from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";

const HeroCard = () => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="px-6 py-8 flex flex-col gap-6 w-full max-w-2xl lg:max-w-3xl">
      
      {/* Heading */}
      <div className="flex flex-col gap-4 text-left">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
            isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"
          }`}
        >
          Find Trusted <span className="text-[#296dda]">Local Services</span>{" "}
          <span className="whitespace-nowrap">Near You</span>
        </h1>

        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Book verified professionals in{" "}
          <span className="text-[#296dda] font-medium">minutes</span>, from home
          repairs to tutoring — all around your{" "}
          <span className="text-[#296dda] font-medium">neighborhood.</span>
        </p>
      </div>

      {/* Card */}
      <div
        className={`rounded-xl border px-4 py-4 flex flex-col gap-4 ${
          isDark
            ? "border-slate-700 bg-slate-900/40"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* Popular tags */}
        <div
          className={`flex flex-wrap gap-2 text-sm items-center ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <span className="font-medium">Popular:</span>

          {["Plumber", "Electrician", "Cleaning", "Tutor"].map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          className={`h-px w-full ${isDark ? "bg-slate-700" : "bg-gray-200"}`}
        />

        {/* Features */}
        <div
          className={`flex flex-wrap gap-6 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="flex items-center gap-2">
            ⭐ 4.8 Average Rating
          </span>

          <span className="flex items-center gap-2">
            ✔ Verified Professionals
          </span>

          <span className="flex items-center gap-2">
            ⚡ Book in Minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;