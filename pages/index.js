import useAuthStore, { usePageStore } from "@/store/authStore";
import useThemeStore from "@/store/themeStore";
import Image from "next/image";
import { useEffect } from "react";

import Greetings from "@/components/Greetings";
import CloudCardsComp from "@/components/CloudCardsComp";
import Navbar from "@/components/Navbar";
import LoginComponent from "@/components/Login";

export default function Home() {
  useEffect(() => {
    useAuthStore.getState();
    useThemeStore.getState();
    window.scrollTo(0, 0);
  }, []);

  const user = useAuthStore((state) => state.user);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);

  const themeClasses = isDarkMode
    ? "bg-bar_dark text-white"
    : "bg-bar_light text-black";

  const sectionClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  // font size 2xl,

  const cardClass = isDarkMode
    ? "border-dark cursor-pointer flex md:flex-col items-center gap-5 md:items-start w-full px-5 py-3 rounded-[4px] border-2"
    : "border-light cursor-pointer flex md:flex-col items-center gap-5 md:items-start w-full px-5 py-3 rounded-[4px] border-2";

  return (
    
      <section
        className={`${sectionClasses} md:w-[81%] h-screen flex flex-col gap-3 rounded-sm px-5 md:px-8`}
      >
        <CloudCardsComp />
      </section>
    
  );
}
