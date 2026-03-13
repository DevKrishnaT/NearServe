import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import Loginlayout from "../../layout/LoginLayout/loginlayout";
import useLogin from "../../../Context/Login/useLogin";
import ToggleButton from "../../ui/toggleButton";

const LoginPop = () => {

  const theme = useTheme((state) => state.theme);
  const isLoginOpen = useLogin((state) => state.isLoginOpen);
  const closeLogin = useLogin((state) => state.closeLogin);

  if (!isLoginOpen) return null;

  return (

    <div className="fixed inset-0 flex justify-center items-center bg-black/35 z-50">

      <div
        className={`max-w-md w-full flex flex-col justify-center px-8 py-6 rounded-2xl relative ${
          theme === "dark"
            ? "bg-[#1E293B]"
            : "bg-[#F8FAFC]"
        }`}
      >

        <ToggleButton toggle={closeLogin} />

        <Loginlayout />

      </div>

    </div>

  );
};

export default LoginPop;