import {create} from "zustand";

const useMenu = create((set) => ({
    isSidebarOpen : false,
    toggleMenu : ()=>set((state) => ({isSidebarOpen : !state.isSidebarOpen}))
}));

export default useMenu;