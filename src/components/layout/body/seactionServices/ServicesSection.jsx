import React from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import Cradslayout from "./cards/cradslayout";
import plumber from "../../../../assets/Images/plumber.png";
import cleaner from "../../../../assets/Images/cleaner.png";
import electrition from "../../../../assets/Images/electrition.png";
import tutor from "../../../../assets/Images/tutor.png";
import AC_Service from "../../../../assets/Images/Applienc.png";
import technician from "../../../../assets/Images/technician.png";

const ServicesSection = () => {
  const theme = useTheme((state) => state.theme);

  return (
    <div
      className={`px-6 py-6 flex flex-col gap-6 ${
        theme === "dark" ? "bg-[#0F172A]" : "bg-[#FFFFFF]"
      }`}
    >
      <span
        className={`font-bold text-2xl ${
          theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"
        }`}
      >
        Explore Services
      </span>

      <div className="flex gap-4 overflow-x-auto ">
        <div className="min-w-[45%] sm:min-w-[30%] md:min-w-[22%] lg:min-w-[18%]">
          <Cradslayout img={plumber} title="Plumber" />
        </div>

        <div className="min-w-[45%] sm:min-w-[30%] md:min-w-[22%] lg:min-w-[18%]">
          <Cradslayout img={electrition} title="Electrician" />
        </div>

        <div className="min-w-[45%] sm:min-w-[30%] md:min-w-[22%] lg:min-w-[18%]">
          <Cradslayout img={tutor} title="Tutor" />
        </div>

        <div className="min-w-[45%] sm:min-w-[30%] md:min-w-[22%] lg:min-w-[18%]">
          <Cradslayout img={cleaner} title="Cleaner" />
        </div>
        <div className="min-w-[45%] sm:min-w-[30%] md:min-w-[22%] lg:min-w-[18%]">
          <Cradslayout img={AC_Service} title="AC Service" />
        </div>
        <div className="min-w-[45%] sm:min-w-[30%] md:min-w-[22%] lg:min-w-[18%]">
          <Cradslayout img={technician} title="technician" />
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
