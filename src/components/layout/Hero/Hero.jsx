import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import electrician from "../../../assets/Electrician.png";
import mobile from "../../../assets/nearServe_mobile_logo.png"
import RoundedButton from "../../ui/button/RoundedButton";
import HeroCard from "./heroCard/heroCard";

const Hero = () => {
  const theme = useTheme((state) => state.theme);

  return (
    <>
      <div
        className={`relative  m-4 h-[20vh] lg:h-[70vh] lg:flex  lg:relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${
          theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"
        }`}
      >
       <picture>
      
        <source media="(min-width: 1024px)" srcSet={electrician} />

        
        <img
          src={mobile}
          alt="Service poster"
          className="absolute inset-0 w-full h-full object-cover object-[center_-1%] lg:object-[center_10%] lg:scale-100"
        />
      </picture>

      
        <div className="relative z-10 h-full w-full flex items-center justify-between px-6">
          
          <div
            className={`hidden lg:flex items-center h-[85%] w-[35%] rounded-3xl drop-shadow-2xl ${
              theme === "dark" ? "bg-[#1E293B]" : "bg-white"
            }`}
          >
           <HeroCard />
          </div>

         
         
        </div>
      </div>    
    </>
  );
};

export default Hero;    
