import React, { useEffect, useState } from "react";
import useTheme from "../../../Context/Theme/ThemeContext";
import { useParams } from "react-router-dom";
import api from "../../../Context/api/api";

const BookService = () => {
  const theme = useTheme((state) => state.theme);
  const { id } = useParams();
  const [service, setServices] = useState();
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [images, setImages] = useState([]);
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
    console.log(images);
  });

  const isDark = theme === "dark";
  return (
    <div className={`h-full w-full ${isDark ? "bg-black/50" : "bg-white"} p-5`}>
      <div className="flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold capitalize">secureBook</h1>
      </div>
      <div
        className={`border rounded-2xl mt-5 ${isDark ? "border-white" : "border-black"} p-2`}
      >
        <div className="grid grid-cols-10 rounded-2xl  ">
          <div className="col-span-3 flex items-center justify-center">
            {imgLoading ? (
              <h1>Loading...</h1>
            ) : (
              <img
                src={images[0].image_url}
                alt={service?.title}
                className="object-cover h-40 w-full rounded-l-xl"
              />
            )}
          </div>

          <div class="col-span-7 bg-blue-200 p-2 rounded-r-2xl">
            <h1 className={`text-lg capitalize font-bold  "text-black"`}>
              {loading ? "loading.." : service.category}
            </h1>
            <h1 className={`text-2xl capitalize font-bold "text-black"`}>
              {loading ? "loading.." : service.title}
            </h1>
            <h2 className={`text-xl capitalize font-bold  "text-black"`}>
              {`Price :- ${loading ? "loading.." : service.price}₹ / ${loading ? "" : service.price_type}`}
            </h2>
          </div>
        </div>
        
      </div>
      <div className="p-5">
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>Adresses</h1>
        </div>
    </div>
  );
};

export default BookService;
