import React, { useEffect, useRef, useState } from "react";
import HeaderLogo from "../../ui/headerLogo";
import Inputnumber from "../../ui/Inputnumber";
import MainButton from "../../ui/button/mainButton";
import useTheme from "../../../Context/Theme/ThemeContext";
import { validation } from "../../../Context/Login/validation/validatePhoneNo";
import useLogin from "../../../Context/Login/useLogin";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../firebase";
import OtpLayout from "../../features/otp/Otplayout";

const Loginlayout = () => {
  const theme = useTheme((state) => state.theme);
  const [phoneNo, setPhoneNo] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const closeLogin = useLogin((state) => state.closeLogin);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const verifierRef = useRef(null);

  useEffect(() => {
    setupVerifier();
    return () => clearVerifier();
  }, []);

  const clearVerifier = () => {
    if (verifierRef.current) {
      try {
        verifierRef.current.clear();
      } catch (_) {}
      verifierRef.current = null;
    }
    const el = document.getElementById("recaptcha-container");
    if (el) el.innerHTML = "";
  };

  const setupVerifier = () => {
    clearVerifier();
    verifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {},
      "expired-callback": () => {
        clearVerifier();
        setupVerifier();
      },
    });
    verifierRef.current.render().catch(() => clearVerifier());
  };

  const handleSubmit = async () => {
    if (loading) return;

    const res = validation(phoneNo);
    if (!res) {
      setError("Enter valid Phone number");
      return;
    }

    if (!verifierRef.current) {
      setupVerifier();
      await new Promise((r) => setTimeout(r, 800));
    }

    setLoading(true);
    setError(null);

    try {
      const phoneNumber = "+91" + phoneNo;
      window.lastPhoneNumber = phoneNumber;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifierRef.current,
      );

      window.confirmationResult = confirmationResult;
      setOtpPage(true);
    } catch (err) {
      console.error("OTP Error:", err.code, err.message);
      clearVerifier();
      setupVerifier();

      if (err.code === "auth/invalid-app-credential") {
        setError("reCAPTCHA expired. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Daily limit reached. Try later.");
      } else if (err.code === "auth/billing-not-enabled") {
        setError("Service unavailable.");
      } else if (err.code === "auth/invalid-phone-number") {
        setError("Invalid phone number format.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!verifierRef.current) {
      setupVerifier();
      await new Promise((r) => setTimeout(r, 800));
    }

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      window.lastPhoneNumber,
      verifierRef.current,
    );

    window.confirmationResult = confirmationResult;
  };

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-4 py-10">
      <div id="recaptcha-container" />

      {otpPage ? (
        <OtpLayout
          onBack={() => setOtpPage(false)}
          onResend={handleResend}
          closeLogin={closeLogin}
        />
      ) : (
        <>
          <div className="top flex flex-col w-full items-center gap-2">
            <HeaderLogo />
            <div className="flex flex-col items-center">
              <h1
                className={`text-xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"}`}
              >
                Start Finding Services
              </h1>
              <p
                className={`capitalize ${isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"}`}
              >
                Login / Signup
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Inputnumber
              numPlaceholder="Enter Your Number"
              value={phoneNo}
              onchange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhoneNo(value);
                if (error) setError(null);
              }}
              error={error}
            />
            <MainButton
              onClick={handleSubmit}
              text={loading ? "Sending..." : "Send OTP"}
              disabled={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Loginlayout;
