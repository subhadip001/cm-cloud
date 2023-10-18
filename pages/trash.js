import React from "react";
import SidebarDesktopComp from "@/components/SidebarDesktopComp";
import { FcEmptyTrash } from "react-icons/fc";
import useThemeStore from "@/store/themeStore";

const Trash = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const themeClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  return (
    <main className={`md:flex ${themeClasses}`}>
      <SidebarDesktopComp />
      <section className={`w-[90%] flex flex-col gap-5 md:w-[75%] mx-auto py-5 md:p-5`}>
        <div className="flex items-center justify-center h-[80vh]">
          <FcEmptyTrash className="text-[12rem] text-light_dark" />
        </div>
      </section>
    </main>
  );
};

export default Trash;
