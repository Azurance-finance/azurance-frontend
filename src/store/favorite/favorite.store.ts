import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IFavoriteState } from "./favorite.type";
import { InsuranceType } from "../insurance/insurance.type";

export const useFavoriteStore = create(
  persist<IFavoriteState>(
    (set, get) => ({
      favorites: [],
      addFavorite: (insurance: InsuranceType) => {
        set((state) => ({
          favorites: [...state.favorites, insurance],
        }));
      },
      removeFavorite: (insurance: InsuranceType) => {
        const favoriteLists = get().favorites;
        const newList = favoriteLists.filter(
          (favoriteList) => favoriteList.id != insurance.id
        );
        set({ favorites: newList });
      },
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
