import Head from "next/head";
import Footer from "./Footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useThemeStore from "@/store/themeStore";
import Navbar from "./Navbar";
import useAuthStore, { usePageStore } from "@/store/authStore";
import LoginComponent from "./Login";
import SidebarDesktopComp from "./SidebarDesktopComp";
//const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export default function ContentLayout({ children }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);
  const themeClasses = isDarkMode
    ? "bg-bar_dark text-dark h-screen overflow-hidden"
    : "bg-bar_light text-light h-screen overflow-hidden";

  return (
    <main
      className={`${themeClasses} w-[100%] md:w-[95%] md:flex mx-auto justify-between`}
    >
      <SidebarDesktopComp />
      {children}
    </main>
  );
}
