import React, { useState } from "react";
import HeaderLogo from "../../ui/headerLogo";
import Inputnumber from "../../ui/Inputnumber";
import MainButton from "../../ui/button/mainButton";
import useTheme from "../../../Context/Theme/ThemeContext";
import { validation } from "../../../Context/Login/validation/validatePhoneNo";
import useOtpPage from "../../../Context/Login/otp/useOtpPage";
import useLogin from "../../../Context/Login/useLogin";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../firebase";

const Loginlayout = () => {
  const theme = useTheme((state) => state.theme);
  const [phoneNo, setPhoneNo] = useState("");
  const openOtpPage = useOtpPage((state) => state.openOtpPage);
  const closeLogin = useLogin((state) => state.closeLogin);
  const [error, setError] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }
  };
  const handleSubmit = async () => {
    const res = validation(phoneNo);

    if (!res) {
      setError("Enter valid Phone number");
      return;
    }

    try {
      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;

      const phoneNumber = "+91" + phoneNo;

      window.lastPhoneNumber = phoneNumber;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );

      window.confirmationResult = confirmationResult;

      window.signInWithPhoneNumberFn = (phone, verifier) =>
        signInWithPhoneNumber(auth, phone, verifier);

      openOtpPage();
      closeLogin();
    } catch (error) {
      console.error(error);
      setError("Failed to send OTP");
    }
  };

  return (
    <div className="flex flex-col gap-4 py-10">
      <div className="top flex flex-col w-full items-center gap-2">
        <div>
          <HeaderLogo />
        </div>
        <div className="flex flex-col items-center">
          <h1
            className={`${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"} text-xl font-bold `}
          >
            Start Finding Services
          </h1>
          <p
            className={`capitalize ${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"}`}
          >
            Login / Signup
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
          <Inputnumber
            numPlaceholder={"Enter Your Number"}
            value={phoneNo}
            onchange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhoneNo(value);
              if (error) setError(null);
            }}
            error={error}
          />
        </div>
        <MainButton onClick={handleSubmit} text="Send OTP" />
      </div>
    </div>
  );
};

export default Loginlayout;
