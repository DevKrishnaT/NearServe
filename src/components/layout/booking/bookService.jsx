import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import { useParams } from "react-router-dom";

const BookService = () => {
  const theme = useTheme((state) => state.theme);
  const id = useParams();
  const [service, setServices] = useState();
  const [loading, setLoading] = useState(true);
  

  const isDark = theme === "dark";
  return (
    <div className={`h-full w-full ${isDark ? "bg-black/50" : "bg-white"} p-5`}>
      <div className="flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold capitalize">secureBook</h1>
      </div>
      <div
        className={`border rounded-2xl mt-5 ${isDark ? "border-white" : "border-black"} p-2`}
      >
        <div className="grid grid-cols-10 rounded-2xl  ">
          <div class="col-span-3 bg-red-200 flex items-center h-25 w-25">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <img src={service?.img} alt="" className="object-contain" />
            )}
          </div>

          <div class="col-span-7 bg-blue-200">
            <h1 className={`text-lg`}>
              {loading ? "loading.." : service.category}
            </h1>
            <h1 className={`text-2xl`}>
              {loading ? "loading.." : service.title}
            </h1>
            <h2 className={`text-xl`}>
              {loading ? "loading.." : service.price}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
