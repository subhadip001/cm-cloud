import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create(
  persist(
    (set) => ({
      autoDeleteDriveItems: false,
      setAutoDeleteDriveItems: () => set((state) => ({ autoDeleteDriveItems: !state.autoDeleteDriveItems })),
    }),
    {
      name: "settings-storage",
    }
  )
);

export default useSettingsStore;
