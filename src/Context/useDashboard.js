import {create} from "zustand";


const useDashboard = create((set) => ({
    isDashboardOpen : false,
    openDashboard: () => set({isDashboardOpen : true}),
    closeDashboard: () => set({isDashboardOpen : false})
}))

export default useDashboard;