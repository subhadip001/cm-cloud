import SidebarDesktopComp from "@/components/SidebarDesktopComp";
import React from "react";
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
        className={`w-[90%] flex flex-col gap-5 md:w-[75%] mx-auto py-5`}
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
            <span>Auto Delete Original Drive Items after Optimisation</span>
            <div className="flex items-center">
              <div
                onClick={() => {
                  setAutoDeleteDriveItems(!autoDeleteDriveItems);
                }}
                className={`${
                  autoDeleteDriveItems ? "bg-brand" : "bg-gray-300"
                } inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 cursor-pointer`}
              >
                <span
                  className={`${
                    autoDeleteDriveItems ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Settings;
