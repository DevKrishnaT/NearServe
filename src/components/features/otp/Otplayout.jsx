import React, { useEffect, useState } from "react";
import OTPInput from "./OTPInput";
import useOtpStore from "../../../store/useOtpStore";
import MainButton from "../../ui/button/mainButton";
import ToggleButton from "../../ui/toggleButton";
import api from "../../../Context/api/api";
import { log } from "firebase/firestore/pipelines";

export default function OtpLayout({
  onBack,
  onResend,
  closeLogin,
  confirmationResult,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const MAX_RESEND = 3;
  const {
    otp,
    setOtp,
    timer,
    tick,
    canResend,
    resendCount,
    startTimer,
    increaseResend,
  } = useOtpStore();

  useEffect(() => {
    if (!timer) return;

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick, timer]);

  const verifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!confirmationResult) {
      setError("Session expired. Please request a new OTP.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await confirmationResult.confirm(code);
      const user = result.user;
   
      

      const token = await user.getIdToken();
      
      

      await api.post(
        "/user",
        {
          name: "user",
          phoneNo: user.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      closeLogin();
    } catch (err) {
      if (err?.code === "auth/invalid-verification-code") {
        setError("Incorrect OTP. Please try again.");
      } else if (err?.code === "auth/code-expired") {
        setError("OTP expired. Please resend.");
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendCount >= MAX_RESEND) {
      setError("Maximum resend limit reached. Please try again later.");
      return;
    }

    setError(null);

    try {
      await onResend();
      increaseResend();
      startTimer();
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try later.");
      } else if (err.code === "auth/invalid-app-credential") {
        setError("reCAPTCHA expired. Please go back and retry.");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    }
  };

  const attemptsLeft = MAX_RESEND - resendCount;

  return (
    <div className="flex flex-col gap-6 p-6">
      <ToggleButton toggle={onBack} />
      <h2 className="text-xl font-bold text-center">Enter 6 digit OTP</h2>

      <OTPInput otp={otp} setOtp={setOtp} />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <MainButton
        onClick={verifyOtp}
        text={loading ? "Verifying..." : "Verify OTP"}
        disabled={loading}
      />

      <div className="text-center text-sm">
        {!canResend ? (
          <p className="text-gray-500">Resend OTP in {timer}s</p>
        ) : resendCount >= MAX_RESEND ? (
          <p className="text-red-400">Maximum resend attempts reached.</p>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={resendOtp}
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
            <p className="text-gray-400 text-xs">
              {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
