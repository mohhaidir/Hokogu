import {
  SET_FAVOURITES,
  SET_FAVOURITESLOADING,
  SET_POPULAR,
  SET_POPULARLOADING
} from "./types";
import axios from "axios";
import alertify from 'alertifyjs';
import { hostingUrl } from "../../host";
const url = hostingUrl;

export const getPopularRecipies = () => {
  return dispatch => {
    dispatch(setPopularLoading(true));
    console.log("lagi");
    axios({
      method: "get",
      url: url + "/favorites/most"
    })
      .then(response => {
        console.log(response);
        dispatch({
          type: SET_POPULAR,
          payload: response.data.mostFavorite
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getFavourites = () => {
  console.log("aaaaaa");
  // console.log(token)
  let token = localStorage.getItem("hokogu_token");
  console.log("masuk");
  return dispatch => {
    dispatch(setFavouritesLoading(true));
    console.log("lagi");
    axios({
      method: "get",
      url: url + "/favorites",
      headers: {
        token: token
      }
    })
      .then(response => {
        console.log(response);
        dispatch({
          type: SET_FAVOURITES,
          payload: response.data.favorites
        });

        // setFavouritesLoading(false);
        // setFavourites(response.data.favorites)
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addToFavourite = data => {
  let token = localStorage.getItem("hokogu_token");
  return dispatch => {
    axios({
      method: "post",
      url: url + "/favorites",
      data: data,
      headers: {
        token: token
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const removeFromFavourite = id => {
  let token = localStorage.getItem("hokogu_token");
  return dispatch => {
    axios({
      method: "delete",
      url: url + `/favorites/${id}`,
      headers: {
        token: token
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const setFavouritesLoading = value => {
  return {
    type: SET_FAVOURITESLOADING,
    payload: value
  };
};

export const setFavourites = value => {
  return {
    type: SET_FAVOURITES,
    payload: value
  };
};

export const setPopularLoading = value => {
  return {
    type: SET_POPULARLOADING,
    payload: value
  };
};

export const setPopular = value => {
  return {
    type: SET_POPULAR,
    payload: value
  };
};
