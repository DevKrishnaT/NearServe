import React, { useEffect, useState } from "react";
import useDashboard from "../../../Context/useDashboard";
import useTheme from "../../../Context/Theme/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase.js";
import useAuthState from "../../../Context/useAuthState.js";
import api from "../../../Context/api/api.js";

const Dashboard = () => {
  const theme = useTheme((state) => state.theme);
  const isDashboardOpen = useDashboard((state) => state.isDashboardOpen);
  const closeDashboard = useDashboard((state) => state.closeDashboard);
  const [DBuser, setDBuser] = useState("");
  const { user } = useAuthState();

  useEffect(() => {
    const fetchuser = async () => {
      if (!user) {
        return;
      }
      try {
        const token = await user.getIdToken();

        const res = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDBuser(res.data.user);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };
    fetchuser();
  }, [user]);

  if (!isDashboardOpen) return null;
  const handleLogout = async () => {
    await signOut(auth);
    closeDashboard();
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDark ? "bg-black/70" : "bg-black/30"
      }`}
    >
      <div
        className={`w-[90%] max-w-md rounded-2xl shadow-xl ${
          isDark ? "bg-[#0F172A] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            onClick={closeDashboard}
            className={`px-3 py-1 rounded-md ${
              isDark
                ? "bg-[#1E293B] hover:bg-[#334155]"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center py-6 gap-3">
          <div
            className={`p-4 rounded-full ${
              isDark ? "bg-[#1E293B]" : "bg-gray-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>

          <div className=" flex flex-col justify-center items-center">
            <div className="text-xl font-semibold">{DBuser.name}</div>
            <div className="text-md">{DBuser.phoneNo}</div>
          </div>
        </div>

        <div className="px-5 pb-6 space-y-3">
          <button
            className={`w-full py-2 rounded-lg flex justify-center gap-2  ${
              isDark
                ? "bg-[#1E293B] hover:bg-[#334155]"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            orders
          </button>

          <button
            className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex justify-center gap-2"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
