import useAuthStore from "@/store/authStore";
import useThemeStore from "@/store/themeStore";
import React, { useEffect, useState } from "react";
import { SiGooglecloud } from "react-icons/si";
import { IoLogoDropbox } from "react-icons/io5";
import { SiMicrosoftonedrive } from "react-icons/si";
import { PiGooglePhotosLogoBold } from "react-icons/pi";
import { useRouter } from "next/router";

export default function CloudCardsComp() {
  useEffect(() => {
    // Initialize the store on the client side
    useAuthStore.getState();
    useThemeStore.getState();
  }, []);

  const user = useAuthStore((state) => state.user);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { push } = useRouter();

  const cardClass = isDarkMode
    ? "border-dark cursor-pointer flex md:flex-col items-center gap-5 md:items-start w-full px-5 py-3 rounded-[4px] border-2"
    : "border-light cursor-pointer flex md:flex-col items-center gap-5 md:items-start w-full px-5 py-3 rounded-[4px] border-2";

  return (
    <div className="mt-8 md:mt-0">
      <div className="">
        <span
          className={`text-2xl md:text-4xl ${
            !isDarkMode ? "text-light_dark" : "text-light_light"
          } `}
        >
          My Clouds
        </span>
        <div className="flex flex-col md:flex-row gap-5 justify-center py-5">
          <div
            className={cardClass}
            onClick={() => {
              push("/googleCloud");
            }}
          >
            <div className="">
              <SiGooglecloud className="text-6xl md:text-8xl" />
            </div>
            <span>Google Cloud (Drive + Photos)</span>
          </div>
          <div className={cardClass}>
            <div>
              <IoLogoDropbox className="text-6xl md:text-8xl" />
            </div>
            <span>Dropbox (coming soon...)</span>
          </div>
          <div className={cardClass}>
            <div>
              <SiMicrosoftonedrive className="text-6xl md:text-8xl" />
            </div>
            <span>One Drive (coming soon...)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
