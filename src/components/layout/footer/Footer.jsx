import React, { useState } from "react";
import HeaderLogo from "../../ui/headerLogo";
import useTheme from "../../../Context/Theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useLogin from "../../../Context/Login/useLogin";
import api from "../../../Context/api/api";

const Footer = () => {
  const theme = useTheme((state) => state.theme);
  const isdark = theme == "dark";
  const navigate = useNavigate();
  const auth = getAuth();
  const openLogin = useLogin((state) => state.openLogin);
  const [isProvider, setIsProvider] = useState(false);

  const redirectProvider = async () => {
    const user = auth.currentUser;
    if (!user) {
      openLogin();
      return;
    }

    try {
      const token = await user.getIdToken();

      const res = await api.get("/isprovider", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const isProvider = res.data.isProvider;
      if(isProvider){
        navigate("/provider-dashboard");
      }else{
        navigate("/list-service");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex flex-col  ${isdark ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} px-6 py-4 lg:px-50`}
    >
      <div className="">
        <div>
          <HeaderLogo />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-4 lg:grid-cols-4 ">
        <div className="flex flex-col gap-1">
          <h1
            className={`${isdark ? "text-[#F1F5F9]" : "text-[#0F172A]"}  text-xl font-bold`}
          >
            Platform
          </h1>

          <ul
            className={`${isdark ? "text-[#94A3B8]" : "text-[#64748B]"} flex flex-col gap-1 cursor-pointer`}
          >
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              Browse Services
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
              onClick={redirectProvider}
            >
              Become a Provider
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              Book a Service
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              Categories
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h1
            className={`${isdark ? "text-[#F1F5F9]" : "text-[#0F172A]"}  text-xl font-bold`}
          >
            Company
          </h1>
          <ul
            className={`${isdark ? "text-[#94A3B8]" : "text-[#64748B]"} flex flex-col gap-1 cursor-pointer`}
          >
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              About
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              How It Works
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              Privacy Policy
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              Terms of Service
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h1
            className={`${isdark ? "text-[#F1F5F9]" : "text-[#0F172A]"}  text-xl font-bold`}
          >
            Support
          </h1>
          <ul
            className={`${isdark ? "text-[#94A3B8]" : "text-[#64748B]"} flex flex-col gap-1 cursor-pointer`}
          >
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              {" "}
              Help Center
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              Contact
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              Report Issue
            </li>
            <li
              className={`${isdark ? "liDark" : "liLight"} transition-colors`}
            >
              FAQs
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h1
            className={`${isdark ? "text-[#F1F5F9]" : "text-[#0F172A]"}  text-xl font-bold`}
          >
            Social Links
          </h1>
          <div className="flex gap-2 hover:text-[#ffff]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 432 416"
              className={` ${isdark ? "text-[#94A3B8] hover:text-white" : "text-[#64748B] hover:text-[#296dda]"} transition-colors`}
              fill="currentColor"
            >
              <path d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 1025 1024"
              className={` ${isdark ? "text-[#94A3B8] hover:text-white" : "text-[#64748B] hover:text-[#296dda]"} transition-colors`}
              fill="currentColor"
            >
              <path d="M896.428 1024h-768q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5h768q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5zm-640-864q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5v-64zm0 192q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v512q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5V352zm640 160q0-80-56-136t-136-56q-44 0-96.5 14t-95.5 39v-21q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v512q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5V576q0-53 37.5-90.5t90.5-37.5t90.5 37.5t37.5 90.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5V512z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 16 16"
              className={` ${isdark ? "text-[#94A3B8] hover:text-white" : "text-[#64748B] hover:text-[#296dda]"}  transition-colors`}
              fill="currentColor"
            >
              <path d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05L9.294 6.928ZM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843l-3.664-5.28Z" />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={` w-full items-center justify-center flex ${isdark ? "text-[#F1F5F9]" : "text-[#0F172A]"} pt-5`}
      >
        <span>Dev.Krishna.thakur@Gmail.com</span>
      </div>
    </div>
  );
};

export default Footer;
