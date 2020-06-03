import {
  SET_RECIPIES,
  SET_RECIPE,
  SET_RECIPIES_LOADING,
  SET_RECIPE_LOADING
} from "./types";
import { spoonKEY } from "../../host";
export function getRecipies(query) {
  return dispatch => {
    dispatch(setRecipiesLoading(true));
    let apiUrl = `https://api.spoonacular.com/recipes/search?number=10&apiKey=${spoonKEY}&query=${query}`;
    fetch(apiUrl, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        dispatch({
          type: SET_RECIPIES,
          payload: res.results
        });
      })
      .catch(console.log());
  };
}

// export function getTrack(trackId) {
//     return (dispatch) => {
//         dispatch(setTrackLoading(true))
//         let apiUrl = `https://deezerdevs-deezer.p.rapidapi.com/track/${trackId}`;
//         fetch(apiUrl, {
//             "method": "GET",
//             "headers": {
//               "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//               "x-rapidapi-key": "006ad1b96amsh797559630fa32f2p1918adjsn56d71bb95e0c"
//             }
//         })
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(res)
//             dispatch({
//                 type: GET_TRACK,
//                 payload: res
//             });
//         })
//         .catch(console.log())
//     };
// }

export const setRecipe = value => {
  return {
    type: SET_RECIPE,
    payload: value
  };
};

export const setRecipiesLoading = value => {
  return {
    type: SET_RECIPIES_LOADING,
    payload: value
  };
};

export const setRecipeLoading = value => {
  return {
    type: SET_RECIPE_LOADING,
    payload: value
  };
};
