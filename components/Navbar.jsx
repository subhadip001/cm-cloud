import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import Link from "next/link.js";
import useAuthStore, { usePageStore } from "@/store/authStore.js";
import { useRouter } from "next/router.js";
import useThemeStore from "../store/themeStore.js";
import MenuComponentMobile from "./MenuComponentMobile.jsx";
import logoForDark from "../assets/logo_for_dark.svg";
import Image from "next/image.js";

const Navbar = () => {
  useEffect(() => {
    // Initialize the store on the client side
    useAuthStore.getState();
    useThemeStore.getState();
  }, []);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(true);
  const { push } = useRouter();

  const themeClasses = isDarkMode
    ? "bg-bar_dark text-white"
    : "bg-bar_light text-black";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);

  useEffect(() => {
    setIsLoggedin(isAuthenticated);
    if (!isAuthenticated) {
      setPage("login");
    }
  }, [isAuthenticated]);

  return (
    <div className={themeClasses + " py-4 text-xl sticky border-b-2 top-0"}>
      <div
        className={`w-[90%] md:w-[95%] flex mx-auto justify-between items-center`}
      >
        {!!true && (
          <CgMenuGridO
            className="cursor-pointer md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
        <div className="flex md:gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Image 
              src={logoForDark}
              alt="Femto Logo"
              priority={true}
              width={30}
              height={30}
            />
            <span className="">Femto</span>
            <small className="text-[0.5rem] md:text-[0.65rem] font-normal px-3 bg-[#ffffff1d] border-2 rounded-2xl md:rounded-2xl">
              Private Beta
            </small>
          </div>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
      {/* Mobile version modal */}
      {mobileMenuOpen ? (
        <div className="relative md:hidden">
          <MenuComponentMobile themeClasses={themeClasses} />
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
