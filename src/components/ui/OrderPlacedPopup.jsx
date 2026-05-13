import { useEffect } from "react";
import useTheme from "../../Context/Theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import useOrdersPannel from "../../Context/useOrdersProvider";

export default function OrderPlacedPopup({ open = true, onClose }) {
  const theme = useTheme((state) => state.theme);
  const navigate = useNavigate();
  const openOrderPannel = useOrdersPannel((state) => state.openOrderPannel);

  const isDark = theme === "dark";
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, navigate]);
  const handelDoneButton = () => {
    navigate("/");
  };
  const colors = {
    background: isDark ? "#0F172A" : "#FFFFFF",
    surface: isDark ? "#1E293B" : "#F8FAFC",
    primary: isDark ? "#3B82F6" : "#1E3A8A",
    accent: isDark ? "#60A5FA" : "#2563EB",
    textPrimary: isDark ? "#F1F5F9" : "#0F172A",
    textMuted: isDark ? "#94A3B8" : "#64748B",
    border: isDark ? "#334155" : "#E2E8F0",
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="w-full max-w-md rounded-3xl border p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-28 h-28 rounded-full animate-ping"
              style={{ backgroundColor: colors.accent + "20" }}
            />

            <div
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: colors.accent }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <h2
            className="text-3xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            Order Placed
          </h2>

          <p
            className="mt-3 text-base leading-7"
            style={{ color: colors.textMuted }}
          >
            We Have Booked Your Service
          </p>
        </div>

        <button
          onClick={() => handelDoneButton()}
          className="w-full mt-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.01]"
          style={{
            backgroundColor: colors.primary,
            color: "#FFFFFF",
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
