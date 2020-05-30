import { SET_FAVOURITES} from "./types";

export const setPlaylist = (favourites) => {
  return {
    type : SET_FAVOURITES,
    payload : favourites
  }
}