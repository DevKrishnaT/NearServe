import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTheme = create(
  persist(
    (set, get) => ({
      theme: "dark",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
    }),
    {
      name: "theme-storage",
    },
  ),
);

export default useTheme;