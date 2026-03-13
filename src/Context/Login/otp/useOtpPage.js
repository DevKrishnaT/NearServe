import { create } from "zustand";

const useOtpPage = create((set) => ({

  isOpen: false,

  openOtpPage: () => set({ isOpen: true }),

  closeOtpPage: () => set({ isOpen: false })

}));

export default useOtpPage;