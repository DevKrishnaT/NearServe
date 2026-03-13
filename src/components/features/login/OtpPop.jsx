import React from "react";
import useOtpPage from "../../../Context/Login/otp/useOtpPage";
import ToggleButton from "../../ui/toggleButton";

import useTheme from "../../../Context/Theme/ThemeContext";
import OtpLayout from "../otp/Otplayout";

const OtpPop = () => {
  const theme = useTheme((state) => state.theme);
  const isOpen = useOtpPage((state) => state.isOpen);
  const closeOtpPage = useOtpPage((state) => state.closeOtpPage);

  console.log("otp page:", isOpen);
 if (!isOpen) return null;
  return (
    
      <div className="fixed inset-0 flex justify-center items-center drop-shadow-xl bg-black/25">
        <div
          className={`w-140 flex flex-col justify-center px-8 rounded-2xl relative ${theme === "dark" ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} `}
        >
          <OtpLayout />
          <ToggleButton toggle={closeOtpPage} />
        </div>
      </div>
    
  );
};

export default OtpPop;
