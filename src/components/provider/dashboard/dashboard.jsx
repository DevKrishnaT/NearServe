import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import MobileMenu from "../../layout/menu/MobileMenu";
import HeaderLogo from "../../ui/headerLogo";
import ProviderMenu from "../Menu/ProviderMenu";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import api from "../../../Context/api/api";
import ServiceCard from "../../layout/body/ListedServicess/ServiceCard";
import useOrdersPannel from "../../../Context/useOrdersProvider";
import useAuthState from "../../../Context/useAuthState";

const Dashboard = () => {
  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";

  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);

  const auth = getAuth();

  const { user } = useAuthState();

  // safer zustand selector
  const isOrdersPannelOpen = useOrdersPannel(
    (state) => state?.isOrderPannelOpen ?? false,
  );

  // fetch services
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;

      try {
        const token = await firebaseUser.getIdToken();

        const res = await api.get("/provider/services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("services response:", res.data);

        // safe fallback
        setServices(res?.data?.services ?? []);
      } catch (error) {
        console.error("Service fetch error:", error);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();

        
        const res = await api.get("/provider/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("orders response:", res.data);

        
        setOrders(res.data);
      } catch (error) {
        console.error("Order fetch error:", error);
      }
    };

    fetchOrders();
  }, [user]);

  // debug logs
  useEffect(() => {
    console.log("services state:", services);
  }, [services]);

  useEffect(() => {
    console.log("orders state:", orders);
  }, [orders]);

  return (
    <div
      className={`${
        isDark ? "bg-[#0F172A]" : "bg-white"
      } w-full h-screen flex flex-col overflow-hidden`}
    >
      {/* Mobile Header */}
      <div
        className={`${
          isDark
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-[#F8FAFC] border-[#E2E8F0]"
        } h-15 border flex justify-between items-center px-4 lg:hidden`}
      >
        <HeaderLogo />
        <MobileMenu>
          <ProviderMenu />
        </MobileMenu>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen">
        <ProviderMenu />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 overflow-y-auto p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {isOrdersPannelOpen ? (
            <>
              {(orders ?? []).length > 0 ? (
                (orders ?? []).map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-slate-100 border-slate-300 text-black"
                    }`}
                  >
                    <h2 className="font-semibold text-lg">
                      {order?.service_title ?? "Unknown Service"}
                    </h2>

                    <p>Status: {order?.status ?? "Unknown"}</p>

                    <p>Total: ₹{order?.total ?? 0}</p>

                    <p>
                      Date:{" "}
                      {order?.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                ))
              ) : (
                <div
                  className={`text-lg ${isDark ? "text-white" : "text-black"}`}
                >
                  No Orders Found
                </div>
              )}
            </>
          ) : (
            <>
              {(services ?? []).length > 0 ? (
                (services ?? []).map((item) => (
                  <ServiceCard
                    key={item?.id}
                    service={item}
                    showLocation={false}
                    booknow={false}
                  />
                ))
              ) : (
                <div
                  className={`text-lg ${isDark ? "text-white" : "text-black"}`}
                >
                  No Services Found
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
