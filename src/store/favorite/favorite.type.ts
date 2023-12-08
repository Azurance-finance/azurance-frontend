import { IAzurance } from "../../../types/azurance";

export interface IFavoriteState {
  favorites: IAzurance[];
  addFavorite: (insurance: IAzurance) => void;
  removeFavorite: (insurance: IAzurance) => void;
}
