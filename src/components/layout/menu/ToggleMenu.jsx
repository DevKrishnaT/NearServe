import React from "react";
import useMenu from "../../../Context/Menu/MenuContext";
import useTheme from "../../../Context/Theme/ThemeContext";


const ToggleMenu = () => {
  const toggleMenu = useMenu((state) => state.toggleMenu);
  const theme = useTheme((state) => state.theme);
  return (
    <div onClick={toggleMenu} className={` flex items-center gap-4 ${theme == "dark" ? "text-white" :"text-black" } px-2`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <p className="capitalize ">close</p>
    </div>
  );
};

export default ToggleMenu;
