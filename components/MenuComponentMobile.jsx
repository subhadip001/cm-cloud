import useThemeStore from "@/store/themeStore";
import React from "react";
import Greetings from "./Greetings";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiTimeFive, BiTrash } from "react-icons/bi";
import { BsClouds } from "react-icons/bs";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";

/**
 * @param {Object} props
 * @returns {React.JSX.Element} SidebarDesktopComp component
 */

const MenuComponentMobile = ({ setMobileMenuOpen, themeClasses }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const logout = useAuthStore((state) => state.logout);
  const { push } = useRouter();

  const router = useRouter();

  const tabClass = (tab, next) => {
    if (router.pathname === tab || router.pathname === next) {
      return `${
        !isDarkMode ? "bg-brand" : "bg-brand"
      }  rounded-md py-2 px-4 text-white`;
    }
    return `${
      !isDarkMode ? "hover:bg-[#11182731]" : "hover:bg-[#f8fafc31]"
    } py-2 px-4 hover:rounded-md py-2`;
  };

  return (
    <div className={`${themeClasses} flex flex-col mx-auto w-[95%]`}>
      <Greetings compClass={"px-3 py-2 mt-5 rounded-[4px]"} />
      <div className="my-4 grid grid-cols-3">
        <Link
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
          className={tabClass("/", "/googleCloud")}
          href="/"
        >
          <div className="flex flex-col items-center gap-2">
            <div>
              <BsClouds />
            </div>
            Clouds
          </div>
        </Link>
        <Link
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
          className={tabClass("/recents")}
          href={`/recents`}
        >
          <div className="flex flex-col items-center gap-2">
            <div>
              <BiTimeFive />
            </div>
            Recents
          </div>
        </Link>
        <Link
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
          className={tabClass("/trash")}
          href={`/trash`}
        >
          <div className="flex flex-col gap-2 items-center">
            <div>
              {" "}
              <BiTrash />
            </div>
            Trash
          </div>
        </Link>
        <Link
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
          className={tabClass("/settings")}
          href={`/settings`}
        >
          <div className="flex flex-col items-center gap-2">
            <div>
              <IoSettingsOutline />
            </div>
            Settings
          </div>
        </Link>
        <Link
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
          className={tabClass("")}
          href={`https://t.me/getcypherx`}
        >
          <div className="flex flex-col items-center gap-2">
            <div>
              <FaTelegram />
            </div>
            Join
          </div>
        </Link>
        <div
          className="cursor-pointer hover:bg-[#11182731] px-4 hover:rounded-md py-2"
          itemType="button"
          onClick={() => {
            logout();
            push("/");
            setMobileMenuOpen((prev) => !prev);
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div>
              <RiLogoutCircleRLine />
            </div>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuComponentMobile;
