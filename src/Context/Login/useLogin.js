import {create} from "zustand";

const useLogin = create((set) => ({
    isLoginOpen : false,
    openLogin: () => set({ isLoginOpen: true }),

  closeLogin: () => set({ isLoginOpen: false })
}));
export default useLogin;