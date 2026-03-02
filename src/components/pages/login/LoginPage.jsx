import React from "react";

import useTheme from "../../../Context/Theme/ThemeContext";
import useHandleHome from "../../../Context/redirectToHome";

import Loginlayout from "../../layout/LoginLayout/loginlayout";

const LoginPage = () => {
    const handelHome = useHandleHome();
  const theme = useTheme((state) => state.theme);
  return (
    <div className="h-full flex flex-col justify-center gap-6 px-4 py-4" >
      <div className="fixed top-2 drop-shadow-md" onClick={handelHome}>
        <div
          className={`h-10 w-10  rounded-3xl flex items-center justify-center ${theme == "dark" ? "bg-[#FFFFFF] text-[#0F172A]" : "bg-[#0F172A] text-[#F1F5F9]"}`}
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
      </div>
      <Loginlayout/>
    </div>
  );
};

export default LoginPage;
