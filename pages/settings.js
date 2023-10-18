import SidebarDesktopComp from "@/components/SidebarDesktopComp";
import React from "react";
import { FcEmptyTrash } from "react-icons/fc";
import useThemeStore from "@/store/themeStore";
import useSettingsStore from "@/store/settingsStore";

const Settings = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const autoDeleteDriveItems = useSettingsStore(
    (state) => state.autoDeleteDriveItems
  );
  const setAutoDeleteDriveItems = useSettingsStore(
    (state) => state.setAutoDeleteDriveItems
  );
  const themeClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  return (
    <main className={`md:flex ${themeClasses}`}>
      <SidebarDesktopComp className={`md:flex ${themeClasses}`} />
      <div
        className={`w-[90%] flex flex-col gap-5 md:w-[75%] mx-auto py-5 md:p-5`}
      >
        <span
          className={`text-2xl md:text-4xl ${
            !isDarkMode ? "text-light_dark" : "text-light_light"
          }`}
        >
          Settings
        </span>
        <section>
          <div className="flex justify-between items-center">
            <span>Auto Delete Drive Items after Optimisation</span>
            <div className="flex items-center gap-2 cursor-pointer">
              <label htmlFor="autodelete">Enable</label>
              <input
                onChange={() => {
                  setAutoDeleteDriveItems();
                }}
                checked={autoDeleteDriveItems}
                type="checkbox"
                id="autodelete"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Settings;
