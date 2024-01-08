import axiosClient from "@/utils/axiosConfig";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: {},
      isLoading: false,
      error: "",
      login: async (credentials) => {
        try {
          set({ isLoading: true });
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
            try {
              const response = await axiosClient.post("/register", {
                phone: credentials.phone,
                password: credentials.password,
                confirmPassword: credentials.password,
              });

              console.log(response.data);

              if (response.data.success === true) {
                await axiosClient.post("/connectToCloud", {
                  phone: credentials.phone,
                });
                set({ isAuthenticated: true });
                set({ user: response.data.newUser });
              } else {
                console.error("Error during connecting to cloud");
              }
            } catch (error) {
              console.log(error.response.data);
              set({ error: error?.response?.data?.message });
            }
          } else {
            console.error("Error during login");
          }
        } catch (error) {
          console.error("Error during Getting In:");
          set({ error: error.response.data.message });
        } finally {
          set({ isLoading: false });
          setTimeout(() => {
            set({ error: "" });
          }, 3000);
        }
      },
      logout: async () => {
        try {
          // await axiosClient.get("/logout");
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
