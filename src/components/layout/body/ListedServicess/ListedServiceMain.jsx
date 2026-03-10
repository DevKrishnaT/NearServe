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
          provider="Rajesh Clener"
          distance="5.3"
          price="199"
          eta="1 hr"
          verified={true}
        />
        <ServiceCard
          title="AC Repair"
          discription="Professional home AC repair service"
          provider="CoolFix Services"
          distance="1.3"
          price="299"
          eta="45 min"
          verified={true}
        />
        <ServiceCard
          title="Electrition"
          discription="Certified electricians for all your electrical needs"
          provider="Raju Electrition"
          distance="10.3"
          price="399"
          eta="3 hrs"
          verified={false}
        />
      </div>
    </div>
  );
};

export default ListedServiceMain;
