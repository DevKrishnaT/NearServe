import React from "react";
import useTheme from "../../Context/Theme/ThemeContext";
import Loginlayout from "./login/Loginlayout";
import ListService from "./ListService/ListService";

const ProviderPage = () => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";
  return (
    <div className={` w-full ${isDark ? "bg-[#0F172A]" : "bg-white"} flex items-center justify-center`}>
      <ListService />
    </div>
  );
};

export default ProviderPage;
