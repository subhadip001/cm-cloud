import React, { useEffect, useState } from "react";
import { SiGooglecloud } from "react-icons/si";
import { IoLogoDropbox } from "react-icons/io5";
import { SiMicrosoftonedrive } from "react-icons/si";
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAuthStore, { usePageStore } from "@/store/authStore";
import { BiHide, BiShow } from "react-icons/bi";
import { useSignal } from "@preact/signals-react";
import logoWithBackground from "../assets/logo_with_back.svg";
import Image from "next/image";
import useThemeStore from "@/store/themeStore";

const LoginComponent = () => {
  useEffect(() => {
    useAuthStore.getState();
  }, []);

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);
  const showPassword = useSignal(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    const credentials = {
      phone: data["phone"],
      password: data["password"],
      confirmPassword: data["password"],
    };

    try {
      login(credentials);
      if (isAuthenticated) {
        setPage("home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setPage("home");
    }
  }, [isAuthenticated]);

  const themeClasses = isDarkMode
    ? "bg-bar_dark flex text-dark h-screen overflow-hidden"
    : "bg-bar_light flex text-light h-screen overflow-hidden";

  return (
    <div className={themeClasses}>
      <div className="min-h-[85vh] w-full flex flex-col lg:flex-row gap-5 lg:gap-10 items-center justify-around">
        <div className="flex flex-col gap-10 w-[80%] lg:w-[50%] mx-auto text-center text-4xl md:text-5xl">
          <div className="flex flex-col gap-3 md:gap-8 items-center">
            <div className=" text-4xl md:text-5xl flex items-center gap-3">
              <Image
                src={logoWithBackground}
                alt="logo"
                width={50}
                height={50}
              />
              Femto
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase">
              Cloud Optimization
            </span>
            <p className="text-sm md:text-md md:leading-[1.5rem] mx-auto">
              Reduce upto 80% of your file size in your favourite cloud storage
              by optimising the mediafiles without losing quality.
            </p>
          </div>
          <div className="flex items-center justify-center gap-10 md:gap-20">
            <SiGooglecloud className="text-6xl md:text-8xl" />
            <IoLogoDropbox className="text-6xl md:text-8xl" />
            <SiMicrosoftonedrive className="text-6xl md:text-8xl" />
          </div>
        </div>
        <form
          autoComplete="off"
          className="w-[80%] md:w-[70%] lg:w-[30%] mx-auto flex flex-col gap-7"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number</label>
            <input
              className="px-3 py-2 text-light outline-none border-none rounded-[4px] focus:ring-2 focus:ring-brand transition-all"
              placeholder="Enter your Mobile Number"
              type="text"
              name="phone"
              id="phone"
              maxLength={10}
              required
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password">Password</label>
            <input
              className="px-3 py-2 text-light outline-none border-none rounded-[4px] focus:ring-2 focus:ring-brand transition-all"
              placeholder="Enter your password"
              type={showPassword.value ? "text" : "password"}
              name="password"
              id="password"
              required
            />
            <button
              type="button"
              className="absolute top-[72%] right-3 transform -translate-y-1/2 text-light"
              onClick={() => {
                showPassword.value = !showPassword.value;
              }}
            >
              {showPassword.value ? (
                <div>
                  <BiHide />
                </div>
              ) : (
                <div>
                  <BiShow />
                </div>
              )}
            </button>
          </div>
          <button
            className={`py-2 rounded-[4px] ${
              !!error
                ? "bg-error hover:bg-error"
                : "bg-brand hover:bg-[#0084ffd6]"
            } shadow-sm`}
            type="submit"
            disabled={!!isLoading}
          >
            <div className="text-dark">
              {!!isLoading && !error ? (
                <div className="mx-auto flex gap-2 items-center justify-center">
                  <AiOutlineLoading3Quarters className="spin-fast leading-8" />
                  <span>Taking you in...</span>
                </div>
              ) : !isLoading && !error ? (
                "Get Started"
              ) : (
                error
              )}
            </div>
          </button>
          <div className="flex items-center justify-between">
            <a
              href="https://cypherx.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <small>&copy; CypherX</small>
            </a>
            <a
              href="https://cypherx.in/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <small> Privacy Policy</small>
            </a>
            <a
              href="https://cypherx.in/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <small> Terms & Conditions</small>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
