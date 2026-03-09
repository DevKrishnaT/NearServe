import React from "react";
import img from "../../../../uploads/test.png";
import useTheme from "../../../../Context/Theme/ThemeContext";

const ServiceCard = ({title , discription , rating }) => {
  const theme = useTheme((state) => state.theme);
  const isdark = theme == "dark";
  return (
    <div
      className={`${isdark ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} rounded-2xl  flex flex-col  border`}
    >
      <div className="img">
        <img src={img} alt="" className=" w-full object-cover rounded-t-2xl" />
      </div>
      <div className={`p-4 ${isdark ? "text-[#F8FAFC]" : "text-[#0F172A]"}`}>
        <div>
          <span className="font-bold text-xl">{title}</span>
          <span className="block text-md opacity-75">{discription}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 pt-1">
            {" "}
            {rating}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
         
        </div>

        <div className="pt-4">
          <button
            className={`w-full border rounded-4xl h-9 ${isdark ? "bg-[#334155] text-[#F8FAFC]" : "bg-[#F8FAFC] text-[#0F172A]"}`}
          >
            {" "}
            book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
