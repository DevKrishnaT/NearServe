import React, { useRef, useState } from "react";
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
  const [confirmationResult, setConfirmationResult] = useState(null);

  const verifierRef = useRef(null);
  const containerIdRef = useRef("recaptcha-container-0"); // ← unique ID tracker

  const getFreshVerifier = () => {
    // 1. Destroy old verifier
    if (verifierRef.current) {
      try { verifierRef.current.clear(); } catch (_) {}
      verifierRef.current = null;
    }

    // 2. Remove old container entirely from DOM
    const oldContainer = document.getElementById(containerIdRef.current);
    if (oldContainer) oldContainer.remove();

    // 3. Create a brand new container with a new unique ID
    const newId = `recaptcha-container-${Date.now()}`;
    containerIdRef.current = newId;

    const newContainer = document.createElement("div");
    newContainer.id = newId;
    document.getElementById("recaptcha-root").appendChild(newContainer);

    // 4. Create fresh verifier on the new container
    const verifier = new RecaptchaVerifier(auth, newId, {
      size: "invisible",
      "expired-callback": () => {
        // Token expired silently — will recreate on next submit
        if (verifierRef.current) {
          try { verifierRef.current.clear(); } catch (_) {}
          verifierRef.current = null;
        }
      },
    });

    verifierRef.current = verifier;
    return verifier;
  };

  const handleSubmit = async () => {
    const isValid = validation(phoneNo);
    if (!isValid) {
      setError("Invalid number");
      return;
    }

    setError(null);
    setLoading(true);

    const verifier = getFreshVerifier();

    try {
      const result = await signInWithPhoneNumber(auth, `+91${phoneNo}`, verifier);
      setConfirmationResult(result);
      setOtpPage(true);
    } catch (err) {
      console.error(err);
      try { verifierRef.current?.clear(); } catch (_) {}
      verifierRef.current = null;

      if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try later.");
      } else if (err.code === "auth/invalid-app-credential") {
        setError("reCAPTCHA failed. Please try again.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-4 py-10">
      {/* Static root — dynamic containers get appended here */}
      <div id="recaptcha-root" />

      {otpPage ? (
        <OtpLayout
          onBack={() => setOtpPage(false)}
          onResend={handleSubmit}
          closeLogin={closeLogin}
          confirmationResult={confirmationResult}
        />
      ) : (
        <>
          <div className="top flex flex-col w-full items-center gap-2">
            <HeaderLogo />
            <div className="flex flex-col items-center">
              <h1 className={`text-xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"}`}>
                Start Finding Services
              </h1>
              <p className={`capitalize ${isDark ? "text-[#F1F5F9]" : "text-[#0F172A]"}`}>
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