import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:9000/api/v1/menu";
axios.defaults.withCredentials = true;

type MenuState = {
  loading: boolean;
  menu: null | Record<string, any>;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,

      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });

          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ menu: response.data.menu }); // Update the menu state
            // Update restaurant
            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Something went wrong";
          toast.error(errorMessage);
        } finally {
          set({ loading: false }); 
        }
      },

      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });

          const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ menu: response.data.menu });
           
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Something went wrong";
          toast.error(errorMessage);
        } finally {
          set({ loading: false }); 
        }
      },
    }),
    {
      name: "menu-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
