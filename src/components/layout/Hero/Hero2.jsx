import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";

const HeroTwo = () => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <section
      className={`w-full min-h-[70vh] flex items-center px-6 lg:px-16 ${
        isDark ? "bg-[#0F172A]" : "bg-white"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] w-full gap-10 items-center">
        <div className="flex flex-col gap-6 text-left">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
              isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"
            }`}
          >
            Find Trusted <span className="text-[#296dda]">Local Services</span>{" "}
            <span className="whitespace-nowrap">Near You</span>
          </h1>

          <p
            className={`text-lg sm:text-xl lg:text-2xl leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Book verified professionals in{" "}
            <span className="text-[#296dda] font-medium">minutes</span>, from
            home repairs to tutoring — all around your{" "}
            <span className="text-[#296dda] font-medium">neighborhood.</span>
          </p>

          <div className="mt-4">
            <button className="bg-[#296dda] hover:bg-[#1f58b5] transition px-6 py-3 rounded-lg text-white font-medium">
              Explore Services
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center">
          <div className="w-[90%] h-87.5 bg-linear-to-br from-[#296dda]/20 to-[#296dda]/5 rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroTwo;
