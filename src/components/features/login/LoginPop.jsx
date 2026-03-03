import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import Loginlayout from "../../layout/LoginLayout/loginlayout";
import useLogin from "../../../Context/Login/useLogin";
import ToggleButton from "../../ui/toggleButton";

const LoginPop = () => {
  const theme = useTheme((state) => state.theme);
  const isLoginOpen = useLogin((state) => state.isLoginOpen);
  const toggleLogin = useLogin((state) => (state.toggleLogin) );

  console.log("Login state:", isLoginOpen);
  if (!isLoginOpen) return null;
  return (
    <div className={`fixed inset-0 flex justify-center items-center drop-shadow-xl`}>
      
      <div
        className={`  w-140 flex flex-col justify-center px-8 rounded-2xl relative ${theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} `}
      >
        <ToggleButton toggle={toggleLogin} />
        <Loginlayout />
      </div>
    </div>
  );
};

export default LoginPop;
