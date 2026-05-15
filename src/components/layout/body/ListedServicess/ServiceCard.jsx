import React, { useEffect } from "react";
import img from "../../../../uploads/test.png";
import useTheme from "../../../../Context/Theme/ThemeContext";
import { useState } from "react";
import api from "../../../../Context/api/api";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service, showLocation = true, booknow = true }) => {
  const {
    id,
    user_id,
    address_id,
    title,
    provider,
    category,
    price,
    price_type,
    experience,
    description,

    distance,
    eta,
    verified,
  } = service;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      if (!id) {
        return;
      }
      try {
        const res = await api.get(`/provider/services/${id}`);
        setImages(res.data.images);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [id]);
  const [name, setname] = useState();

  const theme = useTheme((state) => state.theme);
  const isDark = theme === "dark";
  const handleServiceClick = (item) => {
    setSlectedService(item);
  };
  const handleBookClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div
      className={`
      ${isDark ? "bg-[#1E293B] text-[#F1F5F9]" : "bg-[#F8FAFC] text-[#0F172A]"}
      rounded-2xl overflow-hidden 
      border border-[#E2E8F0] dark:border-[#334155]
      hover:scale-[1.02] hover:shadow-xl 
      transition-all duration-200
      flex flex-col
      `}
    >
      <div className="h-44 w-full overflow-hidden flex justify-center items-center">
        {!loading ? (
          <img
            src={images[0].image_url}
            alt={`${category} - ${provider || name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-wide opacity-60">{category}</p>

        <h3 className="font-semibold text-lg leading-tight line-clamp-2 capitalize">
          {title}
        </h3>

        {experience != null && (
          <span className="text-lg bg-blue-100 text-blue-600 px-2 py-1 rounded-md w-fit">
            {experience}+ yrs experience
          </span>
        )}

        {description && (
          <p className="text-sm opacity-80 line-clamp-2 min-h-10 capitalize">
            {description}
          </p>
        )}

        {showLocation && (distance != null || eta != null) && (
          <div className="flex items-center justify-between text-sm opacity-80">
            {distance != null && (
              <span className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>{" "}
                {Math.floor(distance / 1000) == 0
                  ? 1
                  : Math.floor(distance / 1000)}{" "}
                km
              </span>
            )}

            {eta != null && (
              <span className="flex gap-1 items-center">⏱ {eta}</span>
            )}
          </div>
        )}

        {verified && (
          <span className="text-xs text-green-500 font-medium flex gap-1 items-center">
            ✔ Verified Provider
          </span>
        )}

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-lg font-bold text-primary">₹{price}</span>
            <span className="text-xs opacity-70 ml-1">/ {price_type}</span>
          </div>
        </div>

        {booknow && (
          <button
            className={`
          w-full h-9 mt-2 rounded-xl font-medium
          transition
          ${
            isDark
              ? "bg-[#334155] hover:bg-[#3b4a63] text-white"
              : "bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
          }
          `}
            onClick={() => handleBookClick()}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
