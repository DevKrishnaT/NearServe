import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import Loginlayout from "../../layout/LoginLayout/loginlayout";
import useLogin from "../../../Context/Login/useLogin";

const LoginPop = () => {
  const theme = useTheme((state) => state.theme);
  const isLoginOpen = useLogin((state) => state.isLoginOpen);

  console.log("Login state:", isLoginOpen);
  if (!isLoginOpen) return null;
  return (
    <div className={`fixed inset-0`}>
      <div
        className={`h-100 w-150 flex flex-col ${theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} `}
      >
        <Loginlayout />
      </div>
    </div>
  );
};

export default LoginPop;
