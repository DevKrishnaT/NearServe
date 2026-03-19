import React from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import useLogin from "../../../../Context/Login/useLogin";
import LoginPop from "../../../features/login/LoginPop";
import OtpPop from "../../../features/login/OtpPop";
import useAuthState from "../../../../Context/useAuthState";

const DesktopMenu = () => {
  const {user , loading} = useAuthState();

  const openLogin = useLogin((state) => state.openLogin);
  const theme = useTheme((state) => state.theme);

  const handleClick = () => {
    openLogin();
  };

  return (
    <>
      <div
        className={`hidden lg:flex text-xl gap-1 items-center ${theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"
          } cursor-pointer`}
        onClick={!user ? handleLogin : undefined}
      >

        {!loading ? <>
        <p className="capitalize">{user ? "Profile" : "login"}</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg></> : <p >Loading...</p>}
        
      </div>

      <LoginPop />
      <OtpPop />
    </>
  );
};

export default DesktopMenu;