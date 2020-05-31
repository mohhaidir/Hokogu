import { SET_FAVOURITES, SET_FAVOURITESLOADING} from "./types";
import axios from "axios";

const url = 'http://localhost:3000'
const token = localStorage.getItem('hokogu_token')

export const getFavourites = () => {
  console.log('aaaaaa')
  console.log(token)
  console.log('masuk')
  return (dispatch) => {
    dispatch(setFavouritesLoading(true))
    console.log('lagi')
    axios ({
      method: "get",
      url: url + '/favorites',
      headers: {
        token: token
      }
    })
    .then(response => {
      console.log(response)
      dispatch({
        type: SET_FAVOURITES,
        payload:  response.data.favorites
      });

      // setFavouritesLoading(false);
      // setFavourites(response.data.favorites)
    })
    .catch(err => {
        console.log(err)
    })
  }
}

// export const addToFavourite = () => {
//   return (dispatch) => {
//     dispatch(setFavouritesLoading(true))
//     axios ({
//       method: "get",
//       url: url + '/favorites',
//       data: data,
//       headers: {
//         token: token
//       }
//     })
//     .then(response => {
//       setFavourites(response.data.favorites)
//     })
//     .catch(err => {
//         console.log(err)
//     })
//   }
// }


export const setFavouritesLoading = (value)=> {
  return {
    type : SET_FAVOURITESLOADING,
    payload : value
  }
}

export const setFavourites = (value) => {
  return {
    type : SET_FAVOURITES,
    payload : value
  }
}