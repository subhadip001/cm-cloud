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

const SidebarDesktopComp = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const logout = useAuthStore((state) => state.logout);
  const { push } = useRouter();

  const router = useRouter();

  const tabClass = (tab, next) => {
    if (router.pathname === tab || router.pathname === next) {
      return `${
        !isDarkMode ? "bg-[#1118278f]" : "bg-[#f8fafc8f]"
      }  rounded-r-md py-2 px-4 text-white`;
    }
    return `${
      !isDarkMode ? "hover:bg-[#11182731]" : "hover:bg-[#f8fafc31]"
    } py-2 px-4 hover:rounded-r-md py-2`;
  };

  const themeClasses = isDarkMode
    ? "bg-bar_dark text-white"
    : "bg-bar_light text-black";

  return (
    <div
      className={`${themeClasses} hidden md:flex flex-col w-[22%] h-[100vh] overflow-y-auto px-9 py-2`}
    >
      <Greetings />
      <div className="my-4"></div>
      <Link className={tabClass("/", "/googleCloud")} href="/">
        <div className="flex items-center gap-2">
          <BsClouds />
          My Clouds
        </div>
      </Link>
      <Link className={tabClass("/recents")} href={`/recents`}>
        <div className="flex items-center gap-2">
          <BiTimeFive />
          Recents
        </div>
      </Link>
      <Link className={tabClass("/trash")} href={`/trash`}>
        <div className="flex gap-2 items-center">
          <BiTrash />
          Trash
        </div>
      </Link>
      <Link className={tabClass("/settings")} href={`/settings`}>
        <div className="flex items-center gap-2">
          <IoSettingsOutline />
          Settings
        </div>
      </Link>
      <div
        className="cursor-pointer hover:bg-[#11182731] px-4 hover:rounded-r-md py-2"
        itemType="button"
        onClick={() => {
          logout();
          push("/");
        }}
      >
        <div className="flex items-center gap-2">
          <RiLogoutCircleRLine /> Logout from Femto
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktopComp;
