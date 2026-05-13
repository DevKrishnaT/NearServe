import React, { useState } from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import Cradslayout from "./cards/cradslayout";

import plumber from "../../../../assets/Images/plumber.png";
import cleaner from "../../../../assets/Images/cleaner.png";
import electrition from "../../../../assets/Images/electrition.png";
import tutor from "../../../../assets/Images/tutor.png";
import AC_Service from "../../../../assets/Images/Applienc.png";
import technician from "../../../../assets/Images/technician.png";

const ServicesSection = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme((state) => state.theme);

  const services = [
    {
      img: plumber,
      title: "Plumber",
      category: "plumbing",
    },
    {
      img: electrition,
      title: "Electrician",
      category: "electrician",
    },
    {
      img: tutor,
      title: "Tutor",
      category: "tutor",
    },
    {
      img: cleaner,
      title: "Cleaner",
      category: "cleaning",
    },
    {
      img: AC_Service,
      title: "AC Service",
      category: "repair",
    },
    {
      img: technician,
      title: "Technician",
      category: "repair",
    },
  ];
  const [active, setActive] = useState(false);

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

      <div className="flex gap-4 overflow-x-auto custom-scrollbar">
        {services.map((service, index) => (
          <div
            key={index}
            className={`
              min-w-[45%]
              sm:min-w-[30%]
              md:min-w-[22%]
              lg:min-w-[18%]
              cursor-pointer
               ${
                 selectedCategory === service.category
                   ? "border-4 rounded-2xl border-blue-400 "
                   : ""
               }
            `}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === service.category ? "" : service.category,
              )
            }
          >
            <Cradslayout img={service.img} title={service.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
