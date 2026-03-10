import React from "react";
import useTheme from "../../../../../Context/Theme/ThemeContext";

const CardsLayout = ({ img, title }) => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="relative h-40 w-full rounded-2xl overflow-hidden drop-shadow-xl">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>

        <div
          className={`text-lg font-semibold flex w-full items-center justify-center ${
            isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"
          }`}
        >
          {title}
        </div>
      </div>
    </>
  );
};

export default CardsLayout;
