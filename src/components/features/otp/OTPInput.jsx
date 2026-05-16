import React, { useRef } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";

const OTPInput = ({ otp, setOtp }) => {

  const inputs = useRef([]);
  const theme = useTheme((state) => state.theme);
  const isDark = theme === 'dark';

  const handleChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {

    const paste = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .split("");

    if (!/^\d+$/.test(paste.join(""))) return;

    const newOtp = [...otp];

    paste.forEach((num, i) => {
      newOtp[i] = num;
    });

    setOtp(newOtp);

    inputs.current[paste.length - 1]?.focus();
  };

  return (

    <div
      className="flex gap-2 justify-center"
      onPaste={handlePaste}
    >

      {otp.map((digit, index) => (

        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          value={digit}
          type="text"
          maxLength="1"
          inputMode="numeric"
          autoComplete="one-time-code"
          onChange={(e) =>
            handleChange(e.target.value, index)
          }
          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }
          className={`w-12 h-12 text-center text-xl border rounded-lg focus:border-blue-500 outline-none ${isDark ? "border-white text-white" : "border-black text-black"}`}
        />

      ))}

    </div>
  );
};

export default OTPInput;