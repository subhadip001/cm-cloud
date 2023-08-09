import React, { useState } from "react";
import useStore from "../store/store.js";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import Link from "next/link.js";

const Navbar = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(true);

  const themeClasses = isDarkMode
    ? "bg-dark text-white"
    : "bg-light text-black";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={themeClasses + " py-4 text-xl"}>
      <div
        className={`w-[90%] md:w-[95%] flex mx-auto justify-between items-center`}
      >
        {!!isLoggedin && (
          <CgMenuGridO
            className="cursor-pointer md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
        <div className="flex md:gap-5 md:items-center">
          {!!isLoggedin && (
            <CgMenuGridO
              className="cursor-pointer hidden md:block"
              onClick={toggleMobileMenu}
            />
          )}
          <span>CM CLOUD</span>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
          <div className="hidden md:flex md:gap-5">
            {!isLoggedin && (
              <Link href="/login" className={`px-2 py-1`}>
                <span>Login</span>
              </Link>
            )}
            {!!isLoggedin && <div>My Account</div>}
          </div>
          {!isLoggedin && (
            <div className="md:hidden">
              <BiLogInCircle />
            </div>
          )}
        </div>
      </div>
      {/* Mobile version modal */}
      <div
        className={`md:hidden transition-all ease-in-out duration-300 overflow-hidden ${
          mobileMenuOpen ? "h-auto max-h-64" : "h-0 max-h-0"
        }`}
      >
        <div className={`py-2 px-4 ${themeClasses}`}>
          <div className="flex flex-col gap-2">
            <span>Login</span>
            <span>My Account</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
