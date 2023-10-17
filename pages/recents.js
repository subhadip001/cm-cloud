import SidebarDesktopComp from "@/components/SidebarDesktopComp";
import React from "react";
import { FcEmptyTrash } from "react-icons/fc";
import useThemeStore from "@/store/themeStore";

const recents = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
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
          Recents
        </span>
      </div>
    </main>
  );
};

export default recents;
