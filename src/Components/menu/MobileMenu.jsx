
import useTheme from "../../Context/Theme/ThemeContext";

import Menu from "./menu";
import useMenu from "../../Context/Menu/MenuContext";

const MobileMenu = () => {
  const theme = useTheme((state) => state.theme);
  const isSidebarOpen = useMenu((state) => state.isSidebarOpen);
  const toggleMenu = useMenu((state) => state.toggleMenu);
  
  return (
    <div className="row2">
      <div
        className={`profile ${theme == "dark" ? "text-white" : "text-black"}`}
        onClick={toggleMenu}
      >
        {isSidebarOpen ? (
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
              d="M6 18 18 6M6 6l12 12"
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
        
      </div>
      <Menu />
    </div>
    
  );
};

export default MobileMenu;
