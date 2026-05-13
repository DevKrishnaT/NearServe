import React from "react";
import useTheme from "../../Context/Theme/ThemeContext";
import useSearchBar from "../../Context/handelSearch";

const Inputbox = ({ placeholderText, onclick }) => {
  const size = {
    sm: 100,
    lg: 200,
  };
  const theme = useTheme((state) => state.theme);
  const setSBOnFocus = useSearchBar((state) => state.setSBOnFocus);
  const unSetSBOnFocus = useSearchBar((state) => state.unSetSBOnFocus);

  const handelOnFocus = () => {
    setSBOnFocus();
  };
  const handelOnBlur = () => {
    unSetSBOnFocus();
  };

  return (
    <div
      className={`input border flex w-full  rounded-2xl h-10 lg:h-12 items-center px-2 ${theme == "dark" ? "border-white text-white placeholder:text-white" : "border-black"} `}
    >
      <input
        type="text"
        className="flex-8  border-0 flex px-2 items-center h-full w-full focus:outline-0"
        placeholder={placeholderText}
        onFocus={handelOnFocus}
        onBlur={handelOnBlur}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default Inputbox;
