import Head from "next/head";
import Footer from "./Footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useThemeStore from "@/store/themeStore";
import Navbar from "./Navbar";
import useAuthStore, { usePageStore } from "@/store/authStore";
import LoginComponent from "./Login";
//const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export default function Layout({ children }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);
  const themeClasses = isDarkMode
    ? "bg-dark text-dark h-screen overflow-hidden"
    : "bg-light text-light h-screen overflow-hidden";

  return (
    <>
      {page !== "home" ? (
        <div className={themeClasses}>
          <LoginComponent />
          {false && <Footer />}
        </div>
      ) : (
        <div className={themeClasses}>
          <Navbar />
          {children}
          {false && <Footer />}
        </div>
      )}
    </>
  );
}
