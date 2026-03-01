import { create } from "zustand";

const useLocation = create((set) => ({
  islocationOpen: false,
  togglelocationbar: () =>
    set((state) => ({ islocationOpen: !state.islocationOpen })),
}));

export default useLocation;