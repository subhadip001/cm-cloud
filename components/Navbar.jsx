import React, { useEffect, useRef, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import Link from "next/link.js";
import useAuthStore, { usePageStore } from "@/store/authStore.js";
import { useRouter } from "next/router.js";
import useThemeStore from "../store/themeStore.js";
import MenuComponentMobile from "./MenuComponentMobile.jsx";
import logoForDark from "../assets/logo_for_dark.svg";
import logo from "../assets/logo.svg";
import Image from "next/image.js";

/**
 *
 * @returns {React.JSX.Element} Navbar component
 */

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
  const mobileMenuRef = useRef(null);

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

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    });
  }, [mobileMenuOpen]);

  return (
    <div
      ref={mobileMenuRef}
      className={themeClasses + " py-4 text-xl relative"}
    >
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
              src={logo}
              alt="Femto Logo"
              priority={true}
              width={20}
              height={20}
            />
            {/* <span className="">Femto</span> */}
            <p
              className={`text-[0.5rem] leading-5 md:text-[0.65rem] px-2 border ${
                isDarkMode
                  ? "border-border_dark text-dark"
                  : "border-border_light text-light"
              } rounded-2xl md:rounded-2xl`}
            >
              Private Beta
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
      {/* Mobile version modal */}
      {!!mobileMenuOpen ? (
        <div className={`${themeClasses} fixed w-full top-11 md:hidden z-50`}>
          <MenuComponentMobile
            setMobileMenuOpen={setMobileMenuOpen}
            themeClasses={themeClasses}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
