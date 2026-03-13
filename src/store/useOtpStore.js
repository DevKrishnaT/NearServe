import { create } from "zustand";

const useOtpStore = create((set) => ({
  otp: Array(6).fill(""),
  loading: false,
  timer: 60,
  canResend: false,
  resendCount: 0,

  setOtp: (otp) => set({ otp }),

  startTimer: () =>
    set({
      timer: 60,
      canResend: false
    }),

  tick: () =>
    set((state) => {
      if (state.timer <= 1) {
        return { timer: 0, canResend: true };
      }
      return { timer: state.timer - 1 };
    }),

  increaseResend: () =>
    set((state) => ({
      resendCount: state.resendCount + 1
    })),

  setLoading: (loading) => set({ loading }),

  resetOtp: () =>
    set({
      otp: Array(6).fill(""),
      timer: 60,
      canResend: false,
      resendCount: 0,
      loading: false
    })
}));

export default useOtpStore;