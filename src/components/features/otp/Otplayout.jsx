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

  const verifyOtp = () => {

    const code = otp.join("");

    if (code.length !== 6) {
      alert("Enter valid OTP");
      return;
    }

    console.log("Verify OTP:", code);
  };

  const resendOtp = () => {

    if (resendCount >= MAX_RESEND) {
      alert("Too many resend attempts");
      return;
    }

    increaseResend();
    startTimer();

    console.log("OTP resent");
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