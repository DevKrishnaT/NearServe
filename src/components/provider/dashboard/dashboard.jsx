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
  const HandelAcceptOrder = async (orderId) => {
    if (!user) {
      return;
    }
    try {
      const token = await user.getIdToken();

      const res = await api.patch(
        `/provider/accept-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("orders response:", res.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "accepted" } : order,
        ),
      );
    } catch (error) {
      console.error("error in order acceptense");
    }
  };
  const HandelInProgressOrder = async (orderId) => {
    if (!user) {
      return;
    }
    try {
      const token = await user.getIdToken();

      const res = await api.patch(
        `/provider/inProgress-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("orders response:", res.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "in_progress" } : order,
        ),
      );
    } catch (error) {
      console.error("error in order in progress");
    }
  };
   const HandelInCompleteOrder = async (orderId) => {
    if (!user) {
      return;
    }
    try {
      const token = await user.getIdToken();

      const res = await api.patch(
        `/provider/complete-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("orders response:", res.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "completed" } : order,
        ),
      );
    } catch (error) {
      console.error("error in order");
    }
  };
  

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
                    className={`rounded-2xl border p-5 transition-all shadow-sm ${
                      isDark
                        ? "bg-slate-900 border-slate-700 text-white"
                        : "bg-white border-slate-200 text-black"
                    }`}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">
                          {order?.service_title}
                        </h2>

                        <p className="text-sm opacity-70">Order #{order.id}</p>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "accepted"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "in_progress"
                                ? "bg-purple-100 text-purple-700"
                                : order.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-70">Total</span>
                        <span className="font-semibold">₹{order?.total}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="opacity-70">Payment</span>

                        <span
                          className={`font-medium ${
                            order.payment_status === "paid"
                              ? "text-green-500"
                              : order.payment_status === "failed"
                                ? "text-red-500"
                                : "text-yellow-500"
                          }`}
                        >
                          {order.payment_status}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="opacity-70">Date</span>

                        <span>
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Address */}
                    <div
                      className={`mt-4 rounded-xl p-3 text-sm ${
                        isDark ? "bg-slate-800" : "bg-slate-100"
                      }`}
                    >
                      <p className="font-medium mb-1">Address</p>

                      <p>
                        {order?.address_snapshot?.street},{" "}
                        {order?.address_snapshot?.city}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-5">
                      {order.status === "pending" && (
                        <button
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
                          onClick={() => HandelAcceptOrder(order.id)}
                        >
                          Accept
                        </button>
                      )}

                      {order.status === "accepted" && (
                        <button className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm" onClick={() => HandelInProgressOrder(order.id)}>
                          Start
                        </button>
                      )}

                      {order.status === "in_progress" && (
                        <button className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm" onClick={() => HandelInCompleteOrder(order.id)}>
                          Complete
                        </button>
                      )}
                    </div>
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
