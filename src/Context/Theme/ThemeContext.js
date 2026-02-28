import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTheme = create(
  persist(
    (set, get) => ({
      theme: "light",
      toggle: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage",
    },
  ),
);

export default useTheme;