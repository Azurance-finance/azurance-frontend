import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IFavoriteState } from "./favorite.type";
import { IAzurance } from "../../../types/azurance";

export const useFavoriteStore = create(
  persist<IFavoriteState>(
    (set, get) => ({
      favorites: [],
      addFavorite: (insurance: IAzurance) => {
        set((state) => ({
          favorites: [...state.favorites, insurance],
        }));
      },
      removeFavorite: (insurance: IAzurance) => {
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
