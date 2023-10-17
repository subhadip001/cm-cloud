import React, { useEffect } from "react";
import { SiGooglecloud } from "react-icons/si";
import { IoLogoDropbox } from "react-icons/io5";
import { SiMicrosoftonedrive } from "react-icons/si";
import useAuthStore, { usePageStore } from "@/store/authStore";
import { useRouter } from "next/router";

const LoginComponent = () => {
  useEffect(() => {
    // Initialize the store on the client side
    useAuthStore.getState();
  }, []);

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);
  const { push } = useRouter();

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

  return (
    <div className="bg-dark h-screen flex justify-center items-center text-dark">
      <div className="h-[85vh] w-full flex flex-col lg:flex-row lg:w-[95%] lg:gap-10 items-center justify-around">
        <div className="flex flex-col gap-10 w-[80%] lg:w-[50%] mx-auto text-center text-4xl md:text-5xl">
          <div className="flex flex-col gap-6 items-center">
            <span>Bringing the</span>
            <span className=" text-4xl md:text-7xl uppercase">State-of-the-Art</span>
            <p className="text-sm md:text-md md:w-[60%] md:leading-[1.5rem] mx-auto">
              Free up upto 50% for space in your favourite cloud storage by
              optimising the mediafiles without losing quality.
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
              className="px-3 py-2 text-light outline-none border-none rounded-[4px] focus:ring-4 focus:ring-light transition-all"
              placeholder="Enter your Mobile Number"
              type="text"
              name="phone"
              id="phone"
              maxLength={10}
              minLength={10}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="px-3 py-2 text-light outline-none border-none rounded-[4px] focus:ring-4 focus:ring-light transition-all"
              placeholder="Enter your password"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <button
            className="border-2 py-2 rounded-[4px] hover:bg-light hover:text-light transition-all"
            type="submit"
          >
            Get Started
          </button>
          <small>Brought to you by CypherX</small>
        </form>
        
      </div>
    </div>
  );
};

export default LoginComponent;
