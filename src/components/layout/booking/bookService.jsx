import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../Context/api/api";
import { auth } from "../../../../firebase";
import RoundedButton from "../../ui/button/RoundedButton";

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
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
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
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.log("No authenticated user");
          return;
        }

        const token = await user.getIdToken();

        const res = await api.get("/user/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);

        setAddresses(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setAddressesLoading(false);
      }
    };

    fetchAddresses();
  }, []);
  const handelNewAddress = () => {
    setOpen(false);
  }
  const redirectToHome = () => {
    navigate("/");
  };

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

            <div
              className={`rounded-2xl p-5 border-dashed border-2 flex justify-center  cursor-pointer ${
                isDark ? "border-gray-700" : "border-gray-300"
              }`}
              onClick={() => setOpen(true)}
            >
              <p className="text-gray-400">Add Addresses</p>
            </div>
            {loading ? (
              <p>Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <div
                className={`rounded-2xl p-5 border-dashed border-2 mt-2 ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <p className="text-gray-400">No addresses found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 rounded-2xl border cursor-pointer mt-3 transition-all duration-300 hover:scale-[1.01] ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <h3 className="font-bold text-lg capitalize">
                      {address.full_name}
                    </h3>

                    <p className="text-gray-400 mt-1">{address.full_address}</p>

                    <p className="text-gray-400">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>
                ))}
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

              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-4 rounded-2xl font-bold text-lg">
                Continue Booking
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Secure checkout powered by secureBook
              </p>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0  flex justify-center items-center 
        "
        >
          <div
            className={`border rounded-2xl ${
              isDark
                ? "bg-[#1E293B] border-white/10"
                : "bg-white border-gray-200"
            } w-120 flex flex-col p-4`}
          >
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-center w-full">
                <h1 className="font-bold text-2xl">Address</h1>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className={textPrimary}>Location</label>

                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) => handleLocationInput(e.target.value)}
                  onBlur={(e) => handleLocationBlur(e.target.value)}
                  placeholder="Search address..."
                  className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3 ${error.location ? onEror : ""}`}
                />

                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow z-50 max-h-60 overflow-y-auto">
                    {suggestions.map((place, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectAddress(place)}
                        className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                      >
                        {place.properties.formatted}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className={textPrimary}>City</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        city: e.target.value,
                      },
                    }))
                  }
                  placeholder="Enetr city"
                  className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3 ${error.location ? onEror : ""}`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={textPrimary}>State</label>
                <input
                  type="text"
                  value={formData.location.state}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        state: e.target.value,
                      },
                    }))
                  }
                  placeholder="Enetr state"
                  className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3 ${error.location ? onEror : ""} `}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={textPrimary}>Pin code</label>
                <input
                  type="text"
                  value={formData.location.pincode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        pincode: e.target.value,
                      },
                    }))
                  }
                  placeholder="Enetr pincode"
                  className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3 ${error.location ? onEror : ""}`}
                />
              </div>
              <button className={`w-full h-12 rounded-2xl bg-blue-600 text-xl font-bold`} onClick={() => handelNewAddress()}>Save address</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookService;
