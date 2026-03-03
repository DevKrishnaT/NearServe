import React from "react";

import useTheme from "../../../Context/Theme/ThemeContext";
import useHandleHome from "../../../Context/redirectToHome";

import Loginlayout from "../../layout/LoginLayout/loginlayout";
import ToggleButton from "../../ui/toggleButton";

const LoginPage = () => {
    const handelHome = useHandleHome();
  const theme = useTheme((state) => state.theme);
  return (
    <div className="h-full flex flex-col justify-center gap-6 px-4 py-4" >
      <ToggleButton toggle={handelHome} />
      <Loginlayout/>
    </div>
  );
};

export default LoginPage;
