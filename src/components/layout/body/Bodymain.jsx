import React, { useState } from "react";
import ServicesSection from "./seactionServices/ServicesSection";
import ListedServiceMain from "./ListedServicess/ListedServiceMain";
import useTheme from "../../../Context/Theme/ThemeContext";

const Bodymain = () => {
  const theme = useTheme((state) => state.theme);
  const isdark = theme == "dark";
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className={`${isdark ? "bg-[#0F172A]" : "bg-[#FFFFFF]"} h-full`}>
      <ServicesSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ListedServiceMain selectedCategory={selectedCategory} />
    </div>
  );
};

export default Bodymain;
