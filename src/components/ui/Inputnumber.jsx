import React from "react";
import useTheme from "../../Context/Theme/ThemeContext";

const Inputnumber = ({ numPlaceholder, value, onchange, error }) => {

  const theme = useTheme((state) => state.theme);

  return (

    <div
      className={`h-12 border rounded-2xl ${
        error
          ? "border-red-500"
          : theme === "dark"
          ? "border-[#E2E8F0] text-[#F1F5F9]"
          : "border-[#334155] text-[#0F172A]"
      }`}
    >

      <input
        type="tel"
        className="w-full h-full bg-transparent focus:outline-none px-2"
        placeholder={numPlaceholder}
        value={value}
        onChange={onchange}
      />

    </div>
  );
};

export default Inputnumber;