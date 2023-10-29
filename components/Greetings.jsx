import useAuthStore from "@/store/authStore";
import useThemeStore from "@/store/themeStore";
import axiosClient from "@/utils/axiosConfig";
import React, { useEffect, useState } from "react";

export default function Greetings({isDarkMode, compClass }) {
  const [totalOptimisedSpace, setTotalOptimisedSpace] = useState(0);
  useEffect(() => {
    // Initialize the store on the client side
    useAuthStore.getState();
    useThemeStore.getState();
    getTotalOptimisedSpace();
  }, []);

  const getTotalOptimisedSpace = async () => {
    try {
      const response = await axiosClient.post("/getCloudOptimisedSpace", {
        phone: user?.phone,
      });
      console.log(response.data);
      setTotalOptimisedSpace(response.data.totalSpaceOptimised);
    } catch (error) {
      console.log(error);
    }
  };

  const user = useAuthStore((state) => state.user);

  return (
    <div className={`${compClass} border ${isDarkMode ? "border-border_dark" : "border-border_light"} md:border-none`}>
      <span className="text-2xl">Welcome, {user?.phone}</span>
      <div className="flex gap-3">
        <span>Space Used</span>
        <span>{totalOptimisedSpace} / 20GB</span>
      </div>
    </div>
  );
}
