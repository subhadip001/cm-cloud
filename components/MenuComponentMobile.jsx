import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import React from "react";

const MenuComponentMobile = ({themeClasses}) => {
  const logout = useAuthStore((state) => state.logout);
  const { push } = useRouter();
  return (
    <div className={`py-2 px-4 fixed ${themeClasses}`}>
      <div className="flex flex-col gap-2">
        <span>My Account</span>
        <button
          onClick={() => {
            logout();
            push("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MenuComponentMobile;
