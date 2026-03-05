import React, { useEffect, useState } from "react";
import HeaderLogo from "../../ui/headerLogo";
import Headerlocation from "../../features/Location/headerlocation";
import MobileMenu from "../menu/MobileMenu";
import Inputbox from "../../ui/Inputbox";
import DescktopMenu from "../menu/desktop/DescktopMenu";
import ThemeToggle from "../../features/ThemeToggle/ThemeToggle";
import useTheme from "../../../Context/Theme/ThemeContext";
import AnimatedPlaceHolder from "../../ui/AnimatedPlaceHolder";

const Header = () => {
  const theme = useTheme((state) => state.theme);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 grid grid-rows-2 pt-2 lg:py-4 lg:grid-cols-[1fr_1.4fr_4fr_1fr_0.7fr] lg:grid-rows-1 lg:px-5 lg:items-center lg:justify-items-center lg:gap-4 lg:border-b ${
        theme == "dark"
          ? "border-[#334155] bg-[#1E293B]"
          : "border-[#E2E8F0] bg-white"
      }`}
    >
      <div className="hidden lg:flex">
        <HeaderLogo />
      </div>
      <div
        className={`row1 flex  justify-between items-center  mb-3 max-lg:px-4 `}
      >
        <Headerlocation />
        <MobileMenu />
      </div>

      <div className="row2 mx-3 lg:w-full relative">
        <Inputbox />

        <div
          className={`absolute top-2 lg:top-3 left-3 flex gap-1 z-10 pointer-events-none ${
            theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"
          }`}
        >
          <span>Search for</span>
          <AnimatedPlaceHolder />
        </div>
      </div>
      <DescktopMenu />
      <ThemeToggle />
    </div>
  );
};

export default Header;
