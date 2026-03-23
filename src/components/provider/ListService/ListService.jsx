import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import AutoL from "../../features/Location/AutoLocationDetor/AutoL";

import { LocationToLatLng } from "../../../Context/Location/ChangeLocationTolatlng";
import { uploadImage } from "../../../Context/cloudnery/imageuplaoder";

const ListService = () => {
  const theme = useTheme((state) => state.theme);
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    serviceTitle: "",
    category: "",
    price: "",
    pricingType: "fixed",
    description: "",
    location: {
      address: "",
      lat: null,
      lng: null,
      city: "",
      state: "",
      pincode: "",
    },
    availability: "",
    experience: "",
    phoneNo: "",
    image: [],
  });

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

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadError(null);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...previewUrls]);

    try {
      setUploading(true);

      const uploadedUrls = await Promise.all(
        files.map((file) => uploadImage(file)),
      );

      setFormData((prev) => ({
        ...prev,
        image: [...(prev.image || []), ...uploadedUrls],
      }));
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploadError("Some images failed");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: value,
      },
    }));
    const coords = await LocationToLatLng(value);
    if (coords) {
      setFormData((prev) => ({
        ...prev,
        location: {
          address: value,
          lat: coords.lat,
          lng: coords.lng,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.location.lat || !formData.location.lng) {
      alert("Please select a valid location (auto or map).");
      return;
    }

    console.log("Service Data:", formData);
  };

  const cardBg = isDark ? "bg-[#1E293B]" : "bg-[#F8FAFC]";
  const textPrimary = isDark ? "text-[#F1F5F9]" : "text-[#0F172A]";
  const textMuted = isDark ? "text-[#94A3B8]" : "text-[#64748B]";
  const borderColor = isDark ? "border-[#334155]" : "border-[#E2E8F0]";
  const inputBg = isDark ? "bg-[#0F172A]" : "bg-white";
  const buttonBg = isDark ? "bg-[#3B82F6]" : "bg-[#2563EB]";
  const buttonHover = isDark ? "hover:bg-[#60A5FA]" : "hover:bg-[#1E3A8A]";

  return (
    <div
      className={`w-full min-h-screen pt-20 p-4 lg:p-8 ${
        isDark ? "bg-[#0F172A]" : "bg-[#FFFFFF]"
      } flex justify-center`}
    >
      <div
        className={`w-full max-w-5xl rounded-2xl border ${borderColor} ${cardBg} p-6 lg:p-8 shadow-sm`}
      >
        <div className="mb-6">
          <h1 className={`text-2xl lg:text-3xl font-bold ${textPrimary}`}>
            List Your Service
          </h1>
          <p className={`mt-2 text-sm ${textMuted}`}>
            Add your service details so customers can discover and book you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className={`text-sm font-medium ${textPrimary}`}>
              Service Title
            </label>
            <input
              type="text"
              name="serviceTitle"
              value={formData.serviceTitle}
              onChange={handleChange}
              placeholder="e.g , plumbing service"
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={textPrimary}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            >
              <option value="">Select category</option>
              <option value="cleaning">Cleaning</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrician">Electrician</option>
              <option value="painting">Painting</option>
              <option value="repair">Repair</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className={textPrimary}>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g , 200"
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={textPrimary}>Pricing Type</label>
            <select
              name="pricingType"
              value={formData.pricingType}
              onChange={handleChange}
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            >
              <option value="fixed">Fixed</option>
              <option value="hourly">Hourly</option>
              <option value="visit">Per Visit</option>
            </select>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-2">
            <label className={textPrimary}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="full Description about your service"
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            />
          </div>

          <div className="lg:col-span-2">
            <AutoL
              onDetect={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  location: {
                    address: data.address,
                    lat: data.lat,
                    lng: data.lng,
                  },
                }));
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={textPrimary}>Location</label>
            <input
              type="text"
              value={formData.location.address}
              onBlur={handleLocationChange}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    address: e.target.value,
                  },
                }))
              }
              placeholder="Edit or confirm address"
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            />
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
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
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
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
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
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={textPrimary}>Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            >
              <option value="daytime"> DayTime(9 - 5)</option>
              <option value="nighttime"> NightTime(5 - 9)</option>
              <option value="fullday"> 24 hours</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className={textPrimary}>Experience</label>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            >
              <option value="1year">1Year</option>
              <option value="2year">2Year</option>
              <option value="3year">3Year</option>
              <option value="4year">4Year</option>
              <option value="5year+">5+Year</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className={textPrimary}>Phone</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="your phone number"
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textPrimary} px-4 py-3`}
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-2">
            <label className={textPrimary}>Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className={`w-full rounded-xl border ${borderColor} ${inputBg} ${textMuted} px-4 py-3`}
            />
            {preview.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {preview.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}

            {uploading && (
              <p className="text-sm text-blue-500 mt-1">Uploading images...</p>
            )}

            {uploadError && (
              <p className="text-sm text-red-500 mt-1">{uploadError}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              className={`w-full rounded-xl px-5 py-3 text-white font-semibold ${buttonBg} ${buttonHover}`}
            >
              Publish Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListService;
