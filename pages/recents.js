import React from "react";
import useThemeStore from "@/store/themeStore";

const Recents = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const sectionClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  return (
    <section className={`${sectionClasses} md:w-[81%] h-screen flex flex-col gap-3 rounded-sm px-8`}>
      <div
        className={`w-[100%] flex flex-col gap-5 mx-auto py-5`}
      >
        <span
          className={`text-2xl md:text-4xl ${
            !isDarkMode ? "text-light_dark" : "text-light_light"
          }`}
        >
          Recents
        </span>
      </div>
      </section>
  );
};

export default Recents;
