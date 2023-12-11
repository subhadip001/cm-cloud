import React from "react";
import { FcEmptyTrash } from "react-icons/fc";
import useThemeStore from "@/store/themeStore";

const Trash = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const sectionClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  return (
    <main className={`${sectionClasses} md:w-[81%] h-screen flex flex-col gap-3 rounded-sm px-5 md:px-8`}>
      
      <div className={`w-[100%] flex flex-col gap-5 mx-auto py-5`}>
      <span
          className={`text-2xl md:text-4xl ${
            !isDarkMode ? "text-light_dark" : "text-light_light"
          }`}
        >
          Trash
        </span>
        <div className="flex items-center justify-center h-[80vh]">
          <FcEmptyTrash className="text-[12rem] text-light_dark" />
        </div>
      </div>
    </main>
  );
};

export default Trash;
