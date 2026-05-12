import { create } from "zustand";

const useOrdersPannel = create((set) => ({
  isOrderPannelOpen: false,
  openOrderPannel: () => set({ isOrderPannelOpen: true }),
  closeOrderPannel: () => set({ isOrderPannelOpen: false }),
}));

export default useOrdersPannel;
