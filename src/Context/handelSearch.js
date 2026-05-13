import {create} from "zustand";


const useSearchBar = create((set) => ({
    isSearchBarOnFocus : false,
    setSBOnFocus: () => set({isSearchBarOnFocus : true}),
    unSetSBOnFocus: () => set({isSearchBarOnFocus : false})
}))
export default useSearchBar;