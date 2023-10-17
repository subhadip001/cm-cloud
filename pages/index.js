import useAuthStore, { usePageStore } from "@/store/authStore";
import useThemeStore from "@/store/themeStore";
import Image from "next/image";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import Greetings from "@/components/Greetings";
import CloudCardsComp from "@/components/CloudCardsComp";
import Navbar from "@/components/Navbar";
import LoginComponent from "@/components/Login";
import SidebarDesktopComp from "@/components/SidebarDesktopComp";
// const Greetings = dynamic(() => import("@/components/Greetings"), {
//   ssr: false,
// });
// const CloudCardsComp = dynamic(() => import("@/components/CloudCardsComp"), {
//   ssr: false,
// });

export default function Home() {
  useEffect(() => {
    // Initialize the store on the client side
    useAuthStore.getState();
    useThemeStore.getState();
  }, []);

  const user = useAuthStore((state) => state.user);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);

  const themeClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  // font size 2xl,

  const cardClass = isDarkMode
    ? "border-dark cursor-pointer flex md:flex-col items-center gap-5 md:items-start w-full px-5 py-3 rounded-[4px] border-2"
    : "border-light cursor-pointer flex md:flex-col items-center gap-5 md:items-start w-full px-5 py-3 rounded-[4px] border-2";

  return (
    <>
      <main className={`${themeClasses} md:flex mx-auto`}>
      <SidebarDesktopComp />
        <section className="w-[90%] md:w-[75%] mx-auto flex flex-col gap-3 py-2">
          <Greetings compClass={"md:hidden px-3 py-2 rounded-[4px]"} />
          <CloudCardsComp />
        </section>
      </main>
    </>
  );
}
