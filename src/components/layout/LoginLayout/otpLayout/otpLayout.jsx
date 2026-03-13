import React, { useState } from "react";
import useOtpPage from "../../../../Context/Login/otp/useOtpPage";
import OTPInput from "./otpInput";
import useTheme from "../../../../Context/Theme/ThemeContext";
import HeaderLogo from "../../../ui/headerLogo";
import MainButton from "../../../ui/button/mainButton";

const OtpLayout = () => {
  const theme = useTheme((state) => state.theme);
  const closeOtpPage = useOtpPage((state) => state.closeOtpPage);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    console.log("verify button clicked");
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      const result = await window.confirmationResult.confirm(code);

      console.log("User logged in:", result.user);

      setLoading(false);

      closeOtpPage();
    } catch (err) {
      console.error(err);
      setError("Invalid OTP");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-10">
      <div className="top flex flex-col w-full items-center gap-2">
        <HeaderLogo />

        <h1
          className={`text-xl font-bold ${
            theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"
          }`}
        >
          Enter 6 digit OTP
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <OTPInput otp={otp} setOtp={setOtp} />

        <MainButton
          onClick={verifyOtp}
          text={loading ? "Verifying..." : "Verify OTP"}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default OtpLayout;
