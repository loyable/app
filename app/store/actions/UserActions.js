import { store } from "../../store";

import settings from "../../config/settings";

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

//Fetch user from API
export const REQUEST_USER = (id, callback) => {
  return function(dispatch) {
    fetch(`${settings.url.api}/user/${id}`)
      .then(response => response.json())
      .then(user => {
        dispatch(LOAD_USER(user));
        if (callback) callback();
      });
  };
};

//Fetch card from API
export const REQUEST_CARD = (id, callback) => {
  return function(dispatch) {
    fetch(`${settings.url.api}/card/${id}`)
      .then(response => response.json())
      .then(card => {
        if (callback) callback();
        return card;
      });
  };
};
