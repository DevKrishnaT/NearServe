import React, { useEffect, useState } from "react";
import useTheme from "../../../../Context/Theme/ThemeContext";
import ServiceCard from "./ServiceCard";
import api from "../../../../Context/api/api";
import useSearchStore from "../../../../Context/useSearchStore";

const ListedServiceMain = ({ selectedCategory, title }) => {
  const theme = useTheme((state) => state.theme);
  const isdark = theme == "dark";
  const [services, setServices] = useState([]);
  const search = useSearchStore((state) => state.search);
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "" ||
      service.category?.toLowerCase() === selectedCategory.toLowerCase();

    const searchWords = search.toLowerCase().split(" ");

    const serviceText = `
    ${service.title || ""}
    ${service.description || ""}
    ${service.category || ""}
  `.toLowerCase();

    const matchesSearch = searchWords.every((word) =>
      serviceText.includes(word),
    );

    return matchesCategory && matchesSearch;
  });
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const localstprage = JSON.parse(localStorage.getItem("userLocation"));
        const address = {
          latitude: localstprage.latitude,
          longitude: localstprage.longitude,
        };

        const { data } = await api.post("/services", {
          address,
        });

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
        {filteredServices.length !== 0 ? (
          filteredServices.map((item) => (
            <ServiceCard key={item.id} service={item} />
          ))
        ) : (
          <>
            <div className={`${isdark ? "text-white" : "text-black"} text-xl`}>
              Try removing filters — no service found.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListedServiceMain;
