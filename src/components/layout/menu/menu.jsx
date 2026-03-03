import React from "react";


import useMenu from "../../../Context/Menu/MenuContext";
import useTheme from "../../../Context/Theme/ThemeContext";
import ToggleMenu from "./ToggleMenu";
import Accout from "./Accout";


const Menu = () => {
  const isSidebarOpen = useMenu((state) => state.isSidebarOpen);
 
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const theme = useTheme((state) => state.theme);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-60 border drop-shadow-2xl ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }   ${theme == "dark" ? "bg-[#1E293B] border-[#334155]" : "bg-[#F8FAFC]   border-[#E2E8F0]" }`}
    >
      <div className={` grid grid-cols-1 divide-y  auto-rows-[50px] border-b  ${theme == "dark" ? "divide-[#334155] border-[#334155]" :"divide-[#E2E8F0] border-[#E2E8F0]"}`}>
        <ToggleMenu/>
        <div className={`flex items-center ${theme == "dark" ? "text-white" :"text-black" } px-2`}>
            <button
              className=" w-full   capitalize  flex gap-5 bg-transparent"
              onClick={toggleTheme}
            >
              {theme == "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
              {theme}
            </button>
           
          
        </div>
         <Accout/>
      </div>
    </div>
  );
};

export default Menu;
