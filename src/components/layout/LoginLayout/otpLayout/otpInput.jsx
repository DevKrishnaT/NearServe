import React, { useRef } from "react";

function OTPInput({ otp, setOtp, length = 6 }) {

  const inputs = useRef([]);

  const handleChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }

  };

  return (

    <div className="flex gap-2 justify-center">

      {otp.map((digit, index) => (

        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          ref={(el) => (inputs.current[index] = el)}
          onChange={(e) =>
            handleChange(e.target.value, index)
          }
          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }
          className="w-12 h-12 text-center text-xl border rounded-lg focus:border-blue-500 outline-none"
        />

      ))}

    </div>

  );
}

export default OTPInput;