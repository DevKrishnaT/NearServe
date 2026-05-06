import React from "react";
import useTheme from "../../../Context/Theme/ThemeContext";

const BookService = (item) => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";
  return (
    <div className={`h-full w-full ${isDark ? "bg-black/50" : "bg-white"} p-5`}>
      <div className="flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold capitalize">secureBook</h1>
      </div>
      <div
        className={`border rounded-2xl mt-5 ${isDark ? "border-white" : "border-black"} p-2`}
      >
        <div className="grid grid-cols-10 rounded-2xl ">
          <div class="col-span-3 bg-red-200">30%</div>

          <div class="col-span-7 bg-blue-200">70%</div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
