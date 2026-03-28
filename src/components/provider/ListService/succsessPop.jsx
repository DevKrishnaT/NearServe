import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../../ui/headerLogo";

const SuccsessPop = () => {
  const theme = useTheme((state) => state.theme);
  const [time, setTime] = useState(4);
  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function runTimer() {
      for (let t = 4; t >= 0; t--) {
        setTime(t);
        await sleep(1000);
      }
      navigate("/");
    }

    runTimer();
  }, []);

  const isDark = theme === "dark";
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center  h-full w-full ${isDark ? "bg-[#0F172A]" : "bg-white"} `}
    >
      <div
        className={`h-70 w-90  ${isDark ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} flex justify-center rounded-2xl items-center flex-col gap-2 drop-shadow-2xl`}
      >
        <HeaderLogo />
        <div
          className={`${isDark ? "text-[#F1F5F9]" : " text-[#0F172A]"} flex flex-col justify-center items-center`}
        >
          <h1 className={`text-2xl font-bold`}>Succsefully listed service</h1>
          <p>Auto rediricting in {time}</p>
        </div>

        <button
          className="bg-blue-600 text-white h-10 w-70 rounded-4xl"
          onClick={() => navigate("/")}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccsessPop;
