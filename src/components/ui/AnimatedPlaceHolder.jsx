import React, { useEffect, useState } from "react";
import useTheme from "../../Context/Theme/ThemeContext";

const services = ["electrician", "plumber", "cleaner", "teacher"];
const loopServices = [...services, ...services];

export default function AnimatedPlaceHolder() {
  const theme = useTheme((state) => state.theme);

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === services.length) {
      const timeout = setTimeout(() => {
        setAnimate(false); 
        setIndex(0);       

        requestAnimationFrame(() => {
          setAnimate(true); 
        });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="h-6 overflow-hidden">
      <div
        className={animate ? "transition-transform duration-500 ease-in-out" : ""}
        style={{ transform: `translateY(-${index * 24}px)` }}
      >
        {loopServices.map((service, i) => (
          <div
            key={i}
            className={`h-6 ${
              theme === "dark" ? "text-[#F1F5F9]" : "text-[#0F172A]"
            }`}
          >
            {service}
          </div>
        ))}
      </div>
    </div>
  );
}