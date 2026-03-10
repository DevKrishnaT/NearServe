import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import electrician from "../../../assets/Electrician.png";
import mobile from "../../../assets/nearServe_mobile_logo.png";
import HeroCard from "./heroCard/heroCard";

const Hero = () => {
  const theme = useTheme((state) => state.theme);

  return (
    <div
      className={`relative m-4 min-h-[40vh] lg:min-h-[70vh] lg:flex rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${
        theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"
      }`}
    >
      
      <picture>
        <source media="(min-width: 1024px)" srcSet={electrician} />

        <img
          src={mobile}
          alt="Service poster"
          className="absolute inset-0 w-full h-full object-cover object-[center_-1%] lg:object-[center_10%]"
        />
      </picture>

      
      <div className="relative z-10 w-full flex items-center px-6 py-8 lg:py-0">
        
       
        <div
          className={`hidden lg:flex items-center w-105 xl:w-120 rounded-3xl shadow-xl ${
            theme === "dark" ? "bg-[#1E293B]" : "bg-white"
          }`}
        >
          <HeroCard />
        </div>

      </div>
    </div>
  );
};

export default Hero;