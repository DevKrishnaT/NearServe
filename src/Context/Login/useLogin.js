import {create} from "zustand";

const useLogin = create((set) => ({
    isLoginOpen : false,
    toggleLogin : () => set((state) => ({isLoginOpen: !state.isLoginOpen}))
}));
export default useLogin;