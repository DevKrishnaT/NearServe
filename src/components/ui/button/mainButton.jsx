import React from "react";

const MainButton = ({ onClick, text = "Submit", disabled = false }) => {
  
  return (
    <button
      className="bg-[#296dda] border-0 rounded-2xl h-10 w-full text-xl text-white drop-shadow-xl disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MainButton;