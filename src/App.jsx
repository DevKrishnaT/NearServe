import React from "react";
import Header from "./components/layout/header/Header";
import useTheme from "./Context/Theme/ThemeContext";

import LoginPage from "./components/pages/login/LoginPage";
import HomePage from "./components/layout/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const theme = useTheme((state) => state.theme);

  return (
    <BrowserRouter>
      <div
        className={`${theme == "dark" ? "bg-[#0F172A]" : "bg-white"} h-full`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
