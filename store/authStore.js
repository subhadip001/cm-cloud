import axiosClient from "@/utils/axiosConfig";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: {},
      login: async (credentials) => {
        try {
          const loginRes = await axiosClient.post("/login", {
            phone: credentials.phone,
            password: credentials.password,
          });
          if (loginRes.data.message === "logged_success") {
            set({ isAuthenticated: true });
            set({ user: loginRes.data.user });
            await axiosClient.post("/connectToCloud", {
              phone: credentials.phone,
            });
          } else if (loginRes.data.message === "user_does_not_exist") {
            const response = await axiosClient.post("/register", {
              phone: credentials.phone,
              password: credentials.password,
              confirmPassword: credentials.confirmPassword,
            });

            console.log(response.data);

            if (response.data.success === true) {
              await axiosClient.post("/connectToCloud", {
                phone: credentials.phone,
              });
              set({ isAuthenticated: true });
              set({ user: response.data.newUser });
            } else {
              console.error("Login failed");
            }
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      },
      logout: async () => {
        try {
          await axiosClient.get("/logout");
          set({ isAuthenticated: false });
          set({ user: {} });
        } catch (error) {
          console.log("Error during logout");
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

const usePageStore = create(
  persist(
    (set) => ({
      page: "login",
      setPage: (page) => set({ page }),
    }),
    {
      name: "page-storage",
    }
  )
);

export default useAuthStore;
export { usePageStore };
