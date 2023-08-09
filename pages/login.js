import React from "react";
import { SiGooglecloud } from "react-icons/si";
import { IoLogoDropbox } from "react-icons/io5";
import { SiMicrosoftonedrive } from "react-icons/si";

const Login = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <div className="bg-dark h-screen flex justify-center items-center text-dark">
      <div className="h-[85vh] w-full flex flex-col lg:flex-row lg:w-[95%] lg:gap-10 items-center justify-around">
        <div className="flex flex-col gap-10 w-[80%] lg:w-[50%] mx-auto text-center text-4xl md:text-5xl">
          <div className="flex flex-col gap-6 items-center">
            <span>Introducing</span>
            <span className="font-semibold text-6xl md:text-8xl">CM Cloud</span>
            <p className="text-sm md:text-md md:w-[60%] md:leading-[1.5rem] mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
              mollitia.
            </p>
          </div>
          <div className="flex items-center justify-between md:justify-center md:gap-14">
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
            Start Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
