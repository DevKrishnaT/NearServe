import React, { useEffect } from "react";
import Header from "./components/layout/header/Header";
import useTheme from "./Context/Theme/ThemeContext";

import LoginPage from "./components/pages/login/LoginPage";
import HomePage from "./components/layout/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useLocationState from "./Context/Location/useRealLocation";
import { DetectLocation } from "./Context/Location/detectLocation";

const App = () => {
  const theme = useTheme((state) => state.theme);

  const setUserLocation = useLocationState((s) => s.setUserLocation);

  useEffect(() => {
    const initLocation = async () => {
      const stored = localStorage.getItem("userLocation");

      if (!stored) {
        try {
          const location = await DetectLocation();
          setUserLocation(location);
        } catch (err) {
          console.error("Location detection failed:", err);
        }
      } else {
        setUserLocation(JSON.parse(stored));
      }
    };

    initLocation();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={`${theme == "dark" ? "bg-[#0F172A]" : "bg-white"} h-full`}
      >
         <div id="recaptcha-container"></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
