import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import MobileMenu from "../../layout/menu/MobileMenu";
import HeaderLogo from "../../ui/headerLogo";
import ProviderMenu from "../Menu/ProviderMenu";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import api from "../../../Context/api/api";
import ServiceCard from "../../layout/body/ListedServicess/ServiceCard";

const Dashboard = () => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";
  const [service, setService] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const token = await user.getIdToken();

        const res = await api.get("/provider/services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setService(res.data.services);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log(service);
  });

  return (
    <div
      className={`${isDark ? "bg-[#0F172A]" : "bg-white"}  w-full h-full flex flex-col`}
    >
      <div
        className={`${isDark ? "bg-[#1E293B] border-[#334155]" : "bg-[#F8FAFC] border-[#E2E8F0]"} h-15 border flex justify-between items-center px-4 lg:hidden`}
      >
        <div>
          {" "}
          <HeaderLogo />
        </div>
        <MobileMenu children={<ProviderMenu />} />
      </div>

      <div className="hidden lg:block w-64">
        <ProviderMenu child={<HeaderLogo />} />
      </div>

      <div className={`grid grid-cols-1 px-5 py-5 lg:grid-cols-3 gap-4 `}>
        {service.map((item) => (
          <ServiceCard key={item.id} service={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
