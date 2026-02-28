import React from "react";
import Inputbox from "../Input/Inputbox";
import Headerlocation from "../Location/headerlocation";
import MobileMenu from "../menu/MobileMenu";
import useTheme from "../../Context/Theme/ThemeContext";

const Header = () => {
  const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);
  return (
    <div className={`gride grid-rows-2 pt-2 `}>
      <div className={`row1 flex  justify-between items-center mx-4 mb-3`}>
        <Headerlocation />
        <MobileMenu />
      </div>
      <div className={`row2 mx-3`}>
        <Inputbox />
      </div>
    </div>
  );
};

export default Header;
