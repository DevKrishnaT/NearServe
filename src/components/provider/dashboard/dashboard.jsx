import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import MobileMenu from "../../layout/menu/MobileMenu";
import HeaderLogo from "../../ui/headerLogo";
import ProviderMenu from "../Menu/ProviderMenu";

const Dashboard = () => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";
  return (
    <div
      className={`${isDark ? "bg-[#0F172A]" : "bg-white"}  w-full h-full flex flex-col`}
    >
      <div
        className={`${isDark ? "bg-[#1E293B] border-[#334155]" : "bg-[#F8FAFC] border-[#E2E8F0]"} h-15 border flex justify-between items-center px-4 lg:hidden`}
      >
        <div>
          {" "}
          <HeaderLogo />
        </div>
        <MobileMenu children={<ProviderMenu />} />
      </div>
      <ProviderMenu  child={<HeaderLogo />}/>
      
      <div className={`grid grid-cols-1 px-5 py-5`}></div>
    </div>
  );
};

export default Dashboard;
