import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import useHandleLogin from "../../../Context/HadelLogin";

const Accout = () => {
    
  const theme = useTheme((state) => state.theme);
    const handleLogin = useHandleLogin(); 
  return (
    <div className="flex h-full items-center px-2" onClick={handleLogin}>
      <div
        className={`${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"} flex gap-4 `}
      >
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
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
       <p className="capitalize">account</p>
      </div>
    </div>
  );
};

export default Accout;
