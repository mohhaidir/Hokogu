import axios from "axios";

const url = "http://localhost:3000";

export function register(data) {
  return dispatch => {
    axios({
      url: url + "/users/register",
      method: "post",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar
      }
    })
      .then(success => {
        if (success) {
          return axios({
            url: url + "/users/login",
            method: "post",
            data: {
              email: data.email,
              password: data.password
            }
          });
        }
      })
      .then(response => {
        console.log(response);
        localStorage.setItem("hokogu_token", response.data.token);
        localStorage.setItem("hokogu_name", response.data.name);
        localStorage.setItem("hokogu_avatar", response.data.avatar);
        dispatch({
          type: "LOGIN",
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function login(data) {
  return dispatch => {
    axios({
      url: url + "/users/login",
      method: "post",
      data: {
        email: data.email,
        password: data.password
      }
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("hokogu_token", response.data.token);
        localStorage.setItem("hokogu_name", response.data.name);
        localStorage.setItem("hokogu_avatar", response.data.avatar);
        dispatch({
          type: "LOGIN",
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function googleLogin(data) {
  localStorage.setItem("hokogu_token", data.token);
  localStorage.setItem("hokogu_name", data.name);
  localStorage.setItem("hokogu_avatar", data.avatar);
  return {
    type: "LOGIN",
    payload: {
      token: data.token,
      name: data.name,
      avatar: data.avatar
    }
  };
}

export function logout() {
  localStorage.clear();
  return {
    type: "LOGOUT",
    payload: null
  };
}

export function checkToken() {
  return {
    type: "CHECK_TOKEN"
  };
}

export const setToken = value => {
  return {
    type: "SET_TOKEN",
    payload: value
  };
};

export const setName = value => {
  return {
    type: "SET_NAME",
    payload: value
  };
};

export const setAvatar = value => {
  return {
    type: "SET_AVATAR",
    payload: value
  };
};

export const setIsLoggedIn = value => {
  return {
    type: "SET_ISLOGGEDIN",
    payload: value
  };
};
