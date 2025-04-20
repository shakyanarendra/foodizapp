import { CheckoutSessionRequest, OrderState } from "@/types//orderTypes";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT: string = "https://foodizapp.onrender.com/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
          set({ loading: false });
        } catch (error: any) {
          alert(error.response?.data?.message || "Something went wrong.");
        } finally {
          set({ loading: false });
        }
      },
      getOrderDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);

          set({ loading: false, orders: response.data.orders });
        } catch (error) {
          set({ loading: false });
        }
      },
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
