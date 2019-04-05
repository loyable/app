import { store } from "../../store";

import settings from "../../config/settings";

export const FILTER_MERCHANT = () => {
  return {
    type: "FILTER_CARDS",
    payload: ""
  };
};

export const SET_FILTER = text => {
  return {
    type: "SET_FILTER",
    payload: text
  };
};

export const LOAD_USER = user => {
  return {
    type: "LOAD_USER",
    payload: user
  };
};

export const WATCH_USER = (id, callback) => {
  return function(dispatch) {
    fetch(`${settings.url.api}/user/${id}`)
      .then(response => response.json())
      .then(user => {
        dispatch(LOAD_USER(user));
        if (callback) callback();
      });
  };
};
