import React, { useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const verifierRef = useRef(null);      // holds the RecaptchaVerifier instance
  const isRendered = useRef(false);      // tracks if recaptcha is already rendered

  // Create verifier ONCE on mount
  useEffect(() => {
    initVerifier();
    return () => {
      destroyVerifier();
    };
  }, []);

  const destroyVerifier = () => {
    if (verifierRef.current) {
      try { verifierRef.current.clear(); } catch (_) { }
      verifierRef.current = null;
    }
    isRendered.current = false;
    // Wipe the DOM container so Google's script sees a clean element
    const el = document.getElementById("recaptcha-container");
    if (el) el.innerHTML = "";
  };

  const initVerifier = () => {
    destroyVerifier(); // always clean before creating

    verifierRef.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );

    // render once and mark it done
    verifierRef.current.render().then(() => {
      isRendered.current = true;
    }).catch(() => {
      // render error — will retry on submit
      isRendered.current = false;
    });
  };

  const handleSubmit = async () => {
    if (loading) return;

    const res = validation(phoneNo);
    if (!res) {
      setError("Enter valid Phone number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // If verifier got into a bad state, reinit before calling signIn
      if (!verifierRef.current) {
        initVerifier();
        // small wait for render
        await new Promise((r) => setTimeout(r, 500));
      }

      const phoneNumber = "+91" + phoneNo;
      window.lastPhoneNumber = phoneNumber;
      await verifierRef.current.verify();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifierRef.current
      );

      window.confirmationResult = confirmationResult;
      openOtpPage();
      closeLogin();
    } catch (err) {
      console.error("OTP Error:", err.code, err.message);

      if (err.code === "auth/invalid-app-credential") {
        setError("reCAPTCHA config issue. Please wait a moment and retry.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try after some time.");
      } else if (err.code === "auth/billing-not-enabled") {
        setError("Service unavailable. Contact support.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }

      // Always reinit verifier after a failure so next attempt works
      initVerifier();
    } finally {
      setLoading(false);
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
            className={`${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"
              } text-xl font-bold`}
          >
            Start Finding Services
          </h1>
          <p
            className={`capitalize ${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"
              }`}
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

        {/* Must stay in DOM — Firebase renders reCAPTCHA here */}
        <div id="recaptcha-container"></div>

        <MainButton
          onClick={handleSubmit}
          text={loading ? "Sending..." : "Send OTP"}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Loginlayout;