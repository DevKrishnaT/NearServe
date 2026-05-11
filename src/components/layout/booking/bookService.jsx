import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../Context/api/api";
import { auth } from "../../../../firebase";
import RoundedButton from "../../ui/button/RoundedButton";
import { suggestionData } from "../../../Context/Location/SuggestAdress";
import { LocationToLatLng } from "../../../Context/Location/ChangeLocationTolatlng";
import OrderPlacedPopup from "../../ui/OrderPlacedPopup";

const BookService = () => {
  const theme = useTheme((state) => state.theme);
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setServices] = useState();
  const [loading, setLoading] = useState(true);

  const [imgLoading, setImgLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    service: {
      service_id: id,
    },
    location: {
      label: "Home",
      address: "",
      lat: null,
      lng: null,
      city: "",
      state: "",
      pincode: "",
    },
  });

  const placeOrder = async () => {
    try {
      setOrderLoading(true);

      const token = await auth.currentUser.getIdToken();

      const res = await api.post("/order", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setShowPopup(true);
      const redirect = () => {
        
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOrderLoading(false);
    }
  };



  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setServices(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!id) return;

      try {
        const res = await api.get(`/provider/services/${id}`);
        setImages(res.data.images || []);
      } catch (error) {
        console.error(error);
      } finally {
        setImgLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  const redirectToHome = () => {
    navigate("/");
  };
  const hasEmptyField = Object.values(formData.location).some(
    (value) => value === "" || value === null,
  );

  useEffect(() => {
    const data = localStorage.getItem("userLocation");
    const location = data ? JSON.parse(data) : null;
    if (location) {
      setFormData((prev) => ({
        ...prev,
        location: {
          city: location.address.city,
          state: location.address.state,
          pincode: location.address.pincode,
          address: location.address.fullAddress,
          lat: location.latitude,
          lng: location.longitude,
        },
      }));
    }
  }, []);

  const isDark = theme === "dark";
  const cardBg = isDark ? "bg-[#1E293B]" : "bg-[#F8FAFC]";
  const textPrimary = isDark ? "text-[#F1F5F9]" : "text-[#0F172A]";
  const textMuted = isDark ? "text-[#94A3B8]" : "text-[#64748B]";
  const borderColor = isDark ? "border-[#334155]" : "border-[#E2E8F0]";
  const inputBg = isDark ? "bg-[#0F172A]" : "bg-white";
  const buttonBg = isDark ? "bg-[#3B82F6]" : "bg-[#2563EB]";
  const buttonHover = isDark ? "hover:bg-[#60A5FA]" : "hover:bg-[#1E3A8A]";
  const onEror = "border-red-500";

  return (
    <div
      className={`min-h-screen w-full px-4 md:px-10 py-8 transition-all duration-300 ${
        isDark
          ? "bg-linear-to-br from-[#0c1222] via-[#1E293B] to-[#0c1222] text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex justify-center items-center mb-10">
        <h1
          className="text-4xl font-extrabold tracking-wide cursor-pointer"
          onClick={() => redirectToHome()}
        >
          secure<span className="text-blue-500">Book</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div
            className={`rounded-3xl overflow-hidden border backdrop-blur-xl shadow-2xl ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <div className="grid md:grid-cols-2">
              {/* IMAGE */}
              <div className="h-72 overflow-hidden">
                {imgLoading ? (
                  <div className="h-full w-full animate-pulse bg-gray-300" />
                ) : (
                  <img
                    src={images?.[0]?.image_url}
                    alt={service?.title}
                    className="h-full w-full object-cover hover:scale-105 transition-all duration-500"
                  />
                )}
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <p className="uppercase text-sm tracking-widest text-blue-500 font-semibold">
                    {loading ? "Loading..." : service?.category}
                  </p>

                  <h1 className="text-3xl font-bold mt-2 capitalize">
                    {loading ? "Loading..." : service?.title}
                  </h1>

                  <p
                    className={`mt-4 leading-relaxed ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Premium secure booking service with trusted provider
                    verification and seamless experience.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="text-4xl font-extrabold">
                    ₹{loading ? "..." : service?.price}
                  </div>

                  <p className="text-sm mt-1 text-gray-400">
                    per {service?.price_type}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl p-6 border shadow-xl ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Addresses</h2>

            {loading ? (
              <p>Loading addresses...</p>
            ) : hasEmptyField ? (
              <div
                className={`rounded-2xl p-5 border-dashed border-2 mt-2 ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <p className="text-gray-400">No addresses found</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-2xl border cursor-pointer mt-3 transition-all duration-300 hover:scale-[1.01] ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <h3 className="font-bold text-lg capitalize">
                    {formData.location.address}
                  </h3>

                  <p className="text-gray-400">
                    {formData.location.city}, {formData.location.state} -{" "}
                    {formData.location.pincode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-3">
          <div
            className={`sticky top-5 rounded-3xl p-6 border shadow-2xl ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <h1 className="text-2xl font-bold mb-6 text-center">
              Order Summary
            </h1>

            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-400">Subtotal</p>
                <p>₹{service?.price}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Discount</p>
                <p className="text-green-500">FREE</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Platform Fee</p>
                <p>₹0</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">GST</p>
                <p>Included</p>
              </div>

              <div
                className={`border-t pt-4 flex justify-between text-xl font-bold ${
                  isDark ? "border-white/10" : "border-gray-200"
                }`}
              >
                <p>Total</p>
                <p>₹{service?.price}</p>
              </div>

              <button
                onClick={placeOrder}
                disabled={orderLoading || hasEmptyField}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 py-4 rounded-2xl font-bold text-lg"
              >
                {orderLoading ? "Placing Order..." : "Continue Booking"}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Secure checkout powered by secureBook
              </p>
            </div>
          </div>
        </div>
      </div>
      <OrderPlacedPopup open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default BookService;
