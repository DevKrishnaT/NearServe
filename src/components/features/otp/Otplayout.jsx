import React, { useEffect } from "react";
import OTPInput from "./OTPInput";
import useOtpStore from "../../../store/useOtpStore";

const MAX_RESEND = 3;

const OtpLayout = () => {

  const {
    otp,
    setOtp,
    timer,
    tick,
    canResend,
    resendCount,
    startTimer,
    increaseResend
  } = useOtpStore();

  useEffect(() => {

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);

  }, []);

 const verifyOtp = async () => {
  const code = otp.join("");

  if (code.length !== 6) {
    alert("Enter valid OTP");
    return;
  }

  try {
    console.log("Verify OTP:", code);

    const result = await window.confirmationResult.confirm(code);

    console.log("User logged in:", result.user);

  } catch (error) {
    console.error("OTP verification failed:", error);
    alert("Invalid OTP");
  }
};


  return (

    <div className="flex flex-col gap-6 p-6">

      <h2 className="text-xl font-bold text-center">
        Enter 6 digit OTP
      </h2>

      <OTPInput otp={otp} setOtp={setOtp} />

      <button
        onClick={verifyOtp}
        className="bg-blue-600 text-white h-10 rounded-lg"
      >
        Verify OTP
      </button>

      <div className="text-center text-sm">

        {!canResend ? (
          <p>Resend OTP in {timer}s</p>
        ) : (
          <button
            onClick={resendOtp}
            className="text-blue-600"
          >
            Resend OTP
          </button>
        )}

      </div>

    </div>
  );
};

export default OtpLayout;