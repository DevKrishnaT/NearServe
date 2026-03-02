import React from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";


const CurrAdress = () => {
  const theme = useTheme((state) => state.theme);
  return (
    <div className={`flex flex-col gap-4`}>
      <div
        className={`${theme == "light" ? "text-[#0F172A]" : "text-[#F1F5F9]"} font-bold`}
      >
        Saved Address
      </div>
      <div className={`${theme == "light" ? "text-[#64748B]" : "text-[#94A3B8]"}  flex justify-center items-center `}>
        You Dont have Any adress Saved
      </div>
    </div>
  );
};

export default CurrAdress;
