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
  const sectionClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  return (
    <section className={`${sectionClasses} md:w-[81%] h-screen flex flex-col gap-3 rounded-sm px-5 md:px-8`}>
      <div
        className={`w-[100%] flex flex-col gap-5 mx-auto py-5`}
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
    </section>
  );
};

export default Settings;
