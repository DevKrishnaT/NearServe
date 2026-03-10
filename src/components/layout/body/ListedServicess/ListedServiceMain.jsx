import React from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import ServiceCard from "./ServiceCard";

const ListedServiceMain = () => {
  const theme = useTheme((state) => state.theme);
  const isdark = theme == "dark";

  return (
    <div>
      <div className="px-6">
        <span
          className={`text-2xl font-bold ${isdark ? "text-[#F8FAFC]" : "text-[#0F172A]"} `}
        >
          Services
        </span>
      </div>
      <div
        className={`grid grid-cols-1 mx-6 py-4  gap-4 md:grid-cols-2   lg:grid-cols-4  ${isdark ? "bg-[#0F172A]" : "bg-[#FFFFFF]"}`}
      >
        
          <ServiceCard
            title="home cleaning"
            discription="Professional deep home cleaning services"
            rating="4.5"
          />
          <ServiceCard
            title="Ac service"
            discription="Professional AC servicing with free gas check"
            rating="4.5"
          />
          <ServiceCard
            title="Electrition"
            discription="Certified electricians for all your electrical needs"
            rating="4.9"
          />
        
      </div>
    </div>
  );
};

export default ListedServiceMain;
