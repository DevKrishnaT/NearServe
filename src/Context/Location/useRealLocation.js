import { create } from "zustand";

const useLocationState = create((set) => ({
  location: null,

  setUserLocation: (location) => {
    localStorage.setItem("userLocation", JSON.stringify(location));
    set({ location });
  },

  loadStoredLocation: () => {
    const stored = localStorage.getItem("userLocation");

    if (stored) {
      set({ location: JSON.parse(stored) });
    }
  },
}));

export default useLocationState;