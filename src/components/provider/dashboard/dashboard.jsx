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
  const [services, setServices] = useState([]);
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

        setServices(res.data.services);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    console.log(services);
  }, [services]);

  return (
    <div
      className={`${
        isDark ? "bg-[#0F172A]" : "bg-white"
      } w-full h-screen flex flex-col overflow-hidden`}
    >
      
      <div
        className={`${
          isDark
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-[#F8FAFC] border-[#E2E8F0]"
        } h-15 border flex justify-between items-center px-4 lg:hidden`}
      >
        <HeaderLogo />
        <MobileMenu children={<ProviderMenu />} />
      </div>

    
      <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen">
        <ProviderMenu child={<HeaderLogo />} />
      </div>

     
      <div className="flex-1 lg:ml-64 overflow-y-auto p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {services.map((item) => (
            <ServiceCard key={item.id} service={item} showLocation={false} booknow={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
