import { CURRENCIES } from "@/shared/constant/CURRENCIES";
import { type User } from "@/shared/db/schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUserDB } from "../db/useUserDB";

interface Store extends User {
  // states
  isLoading: boolean;
  currencySymbol: string;

  // Actions
  toggleLoading: () => void;

  loadUser: () => void;

  createUser: ({
    name,
    currency,
    hasFinishedOnboarding,
  }: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  setUserName: (id: User["id"], name: string) => Promise<void>;
  setCurrency: (id: User["id"], currency: string) => void;
}

export const useUserStore = create<Store>()(
  persist(
    (set, get) => ({
      id: undefined,
      name: "",
      currency: "",
      currencySymbol: "",
      hasFinishedOnboarding: false,
      isLoading: false,

      toggleLoading: () =>
        set((state: Store) => ({ isLoading: !state.isLoading })),

      loadUser: async () => {
        try {
          const res = await useUserDB.getUser();

          if (res) {
            const currencySymbol =
              CURRENCIES.find((i) => i.code === res?.currency)?.symbol || "₹";

            set({ ...res, currencySymbol });
          }
        } catch (error) {
          console.error("loadUser: ", error);
        }
      },

      createUser: async ({
        name,
        currency,
        hasFinishedOnboarding = true,
      }: User) => {
        try {
          const userdata = {
            name,
            currency,
            hasFinishedOnboarding,
          };

          const newUser = await useUserDB.creatUser(userdata);

          if (newUser) set({ ...newUser });
        } catch (error) {
          console.error("createUser: ", error);
        }
      },

      updateUser: async (user: User) => {
        try {
          const updatedUser = await useUserDB.updateUser(user);
          if (updatedUser) set({ ...updatedUser });
        } catch (error) {
          console.error("updateUser: ", error);
        }
      },

      setUserName: async (id: User["id"], name: string) => {
        try {
          const res: number | undefined = await useUserDB.setUserNameById(
            id,
            name,
          );

          if (Number(res) > 0) set({ name });
        } catch (error) {
          console.error("setUserName: ", error);
        }
      },

      setCurrency: async (id: User["id"], currency: string) => {
        try {
          const res: number | undefined = await useUserDB.setCurrencyById(
            id,
            currency,
          );

          if (Number(res) > 0) {
            const currencySymbol =
              CURRENCIES.find((i) => i.code === currency)?.symbol || "₹";
            set({ currency, currencySymbol });
          }
        } catch (error) {
          console.error("setCurrency: ", error);
        }
      },
    }),
    {
      name: "openspent-user-storage", // Unique key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
