import React from "react";
import Inputbox from "../Input/Inputbox";
import Headerlocation from "../Location/headerlocation";
import MobileMenu from "../menu/MobileMenu";
import useTheme from "../../Context/Theme/ThemeContext";
import HeaderLogo from "../HeaderLogo/headerLogo";
import DescktopMenu from "../menu/desktop/DescktopMenu";
import Cart from "./cart/Cart";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = () => {
  const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);
  return (
    <div className={`grid grid-rows-2 pt-2 lg:py-4 lg:grid-cols-[1fr_1.4fr_4fr_1fr_0.7fr] lg:grid-rows-1 lg:px-5 lg:items-center lg:justify-items-center lg:gap-4 lg:border-b ${theme == "dark" ? "border-[#334155]" : "border-[#E2E8F0]"}`}>
      <HeaderLogo />
      <div className={`row1 flex  justify-between items-center  mb-3 max-lg:px-4 `}>
        <Headerlocation />
        <MobileMenu />
      </div>
    
      <div className={`row2 mx-3 lg:w-full`}>
        <Inputbox />
      </div>
        <DescktopMenu/>
        <ThemeToggle />
    </div>
  );
};

export default Header;
