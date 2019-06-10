import { store } from "../../store";

import settings from "../../config/settings";

import Storage from "../asyncstorage";

import md5 from "md5";

import io from "socket.io-client";

import axios from "axios";

//Filter merchants
export const FILTER_MERCHANTS = filter => {
  return {
    type: "FILTER_MERCHANTS",
    payload: filter
  };
};

//Persist to state user data
export const LOAD_USER = user => {
  return {
    type: "LOAD_USER",
    payload: user
  };
};

//Persist to state user data
export const SET_USER_ID = userID => {
  return {
    type: "SET_USER_ID",
    payload: userID
  };
};

//Set cards filter
export const SET_FILTER = text => {
  return {
    type: "SET_FILTER",
    payload: text
  };
};

//Persist to state user data
export const SET_ACTIVE_MERCHANT = merchant => {
  return {
    type: "SET_ACTIVE_MERCHANT",
    payload: merchant
  };
};

//Persist to state user data
export const SET_ACTIVE_CARD = card => {
  return {
    type: "SET_ACTIVE_CARD",
    payload: card
  };
};

//Watch user changes from API
export const WATCH_USER = (userID, callback) => {
  return function(dispatch) {
    const socket = io(`${settings.url.watch}`, { query: `id=${userID.id}` });

    socket.on("change", () => {
      dispatch(REQUEST_USER(userID, callback));
    });
  };
};

//Fetch user from API
export const REQUEST_USER = (userID, callback) => {
  return function(dispatch) {
    const { id, token } = userID;

    const state = store.getState(),
      userState = state.user.user;

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    //Fetch user from Storage
    Storage.getItem("user").then(userStorage => {
      if (userStorage) {
        if (JSON.stringify(userStorage) !== JSON.stringify(userState)) {
          dispatch(LOAD_USER(userStorage));
        }
        fetch(`${settings.url.api}/users/${id}`, {
          headers
        })
          .then(res => res.json())
          .then(user => {
            if (user.hasOwnProperty("user")) {
              Storage.setItem("user", user).then(() => {
                dispatch(LOAD_USER(user));
                if (callback) callback();
              });
            }
          })
          .catch(() => {
            setTimeout(() => dispatch(REQUEST_USER(userID)), 2000);
          });
      } else {
        fetch(`${settings.url.api}/users/${id}`, {
          headers
        })
          .then(res => res.json())
          .then(user => {
            if (user.hasOwnProperty("user")) {
              Storage.setItem("user", user).then(() => {
                dispatch(LOAD_USER(user));
                if (callback) callback();
              });
            }
          })
          .catch(() => {
            setTimeout(() => dispatch(REQUEST_USER(userID)), 2000);
          });
      }
    });
  };
};

//Patch device info to API
export const SET_DEVICE = (userID, device, callback) => {
  const { id, token } = userID;

  return function(dispatch) {
    fetch(
      `${settings.url.api}/users/${id}/device`,
      {
        os: device.os,
        token: device.token
      },
      {
        headers: { Authorization: "Bearer " + token }
      }
    ).then(res => {
      if (res.data.hasOwnProperty("id")) {
        if (callback) callback();
      }
    });
  };
};
