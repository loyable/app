import { store } from "../../store";

import settings from "../../config/settings";

import Storage from "../asyncstorage";

import io from "socket.io-client";

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

//Persist to state user data
export const SET_FILTER = text => {
  return {
    type: "SET_FILTER",
    payload: text
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

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    fetch(`${settings.url.api}/users/${id}`, {
      headers
    })
      .then(response => response.json())
      .then(user => {
        dispatch(LOAD_USER(user));
        Storage.updateItem("user", user);
        if (callback) callback();
      })
      .catch(err => {
        setTimeout(() => {
          dispatch(REQUEST_USER(id));
        }, 2000);
      });
  };
};

//Fetch card from API
export const REQUEST_CARD = (id, callback) => {
  return function(dispatch) {
    fetch(`${settings.url.api}/cards/${id}`)
      .then(response => response.json())
      .then(card => {
        if (callback) callback();
        return card;
      });
  };
};
