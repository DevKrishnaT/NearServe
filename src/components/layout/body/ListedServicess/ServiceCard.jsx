import React from "react";
import img from "../../../../uploads/.png"

const ServiceCard = () => {
  const theme = useTheme((state) => state.theme);
  const isdark = theme == "dark";
  return (
    <div
      className={`${isdark ? "bg-[#1E293B]" : "bg-[#F8FAFC]"} rounded-2xl p-4 flex flex-col gap-4`}
    >
      <div className="img ">
        <img src={img} alt="" className="object-cover"/>
      </div>
      <div>
        <h1>Service name</h1>
        
      </div>
    </div>
  );
};

export default ServiceCard;
