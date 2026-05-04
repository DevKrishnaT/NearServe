import React, { useEffect, useState } from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import ServiceCard from "./ServiceCard";
import api from "../../../../Context/api/api";

const ListedServiceMain = () => {
  const theme = useTheme((state) => state.theme);
  const isdark = theme == "dark";
  const [services, setServices] = useState([]);
  

  useEffect(() => {
    const fetchServices = async () => {
      try {
       const localstprage = JSON.parse(localStorage.getItem("userLocation"));
      const address = {
        
        latitude: localstprage.latitude,
        longitude: localstprage.longitude
      }
      
      
       
     
       
       

        
        const { data } = await api.post("/services", {
          address,
        });
        console.log("stated");
        console.log(data.services);
        setServices(data.services);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <div className="px-6">
        <span
          className={`text-2xl font-bold ${isdark ? "text-[#F8FAFC]" : "text-[#0F172A]"} `}
        >
          Services
        </span>
      </div>
      <div
        className={`grid grid-cols-1 mx-6 py-4  gap-4 md:grid-cols-2   lg:grid-cols-4  ${isdark ? "bg-[#0F172A]" : "bg-[#FFFFFF]"}`}
      >
        {services.map((item) => (
          <ServiceCard key={item.id} service={item} />
        ))}
      </div>
    </div>
  );
};

export default ListedServiceMain;
