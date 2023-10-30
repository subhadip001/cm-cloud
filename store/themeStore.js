import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => {
      const prefersDarkMode = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      return {
        isDarkMode: prefersDarkMode, // set the initial state based on the user's preferred color scheme
        toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      };
    },
    {
      name: "app-storage",
    }
  )
);

export default useThemeStore;
