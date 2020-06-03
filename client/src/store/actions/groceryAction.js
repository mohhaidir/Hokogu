import axios from "axios";
import { hostingUrl } from "../../host";
const url = hostingUrl;

export const getGroceries = () => {
  console.log("gettinggg");
  let token = localStorage.getItem("hokogu_token");
  return dispatch => {
    console.log("dispatching");
    dispatch(setGroceriesLoading(true));
    axios({
      method: "get",
      url: url + "/ingredients",
      headers: {
        token: token
      }
    })
      .then(response => {
        console.log(response);
        console.log("gotemm");
        dispatch({
          type: "SET_GROCERIES",
          payload: response.data.ingredients
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addToGroceries = data => {
  let token = localStorage.getItem("hokogu_token");
  return dispatch => {
    axios({
      method: "post",
      url: url + "/ingredients",
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

export const removeFromGroceries = title => {
  let token = localStorage.getItem("hokogu_token");
  return dispatch => {
    axios({
      method: "get",
      url: url + "/ingredients",
      headers: {
        token: token
      }
    })
      .then(response => {
        let success = false;
        let id = null;
        console.log("nestinggg");
        console.log("the deleted one:" + title);

        console.log(response.data.ingredients);
        let temp = response.data.ingredients;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].title === title) {
            id = temp[i].id;
            success = true;
            break;
          }
        }
        if (success) {
          console.log("sucess");
          return axios({
            method: "delete",
            url: url + `/ingredients/${id}`,
            headers: {
              token: token
            }
          });
        } else {
          throw new Error({ msg: "ingredient not found" });
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

export const bulkRemoveGroceries = payload => {
  let token = localStorage.getItem("hokogu_token");
  let selected = [];
  for (let i = 0; i < payload.length; i++) {
    selected.push(payload[i].id);
  }
  console.log("The Ids");
  console.log(selected);
  return dispatch => {
    axios({
      method: "delete",
      url: url + "/ingredients/bulk",
      data: {
        selected: selected
      },
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

export const setGroceriesLoading = value => {
  return {
    type: "SET_GROCERIESLOADING",
    payload: value
  };
};

export const setGroceries = value => {
  return {
    type: "SET_GROCERIES",
    payload: value
  };
};
