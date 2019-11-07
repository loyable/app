// Import libraries
import io from "socket.io-client";
import axios from "axios";

// Import global variables
import settings from "../../config/settings";

// Import storage
import Storage from "../asyncstorage";

// REDUX ACTIONS
// Filter merchants
export const FILTER_MERCHANTS = filter => {
  return {
    type: "FILTER_MERCHANTS",
    payload: filter
  };
};

// Persist to state user data
export const LOAD_USER = user => {
  return {
    type: "LOAD_USER",
    payload: user
  };
};

// Persist to state user data
export const SET_USER_ID = userID => {
  return {
    type: "SET_USER_ID",
    payload: userID
  };
};

// Set cards filter
export const SET_FILTER = text => {
  return {
    type: "SET_FILTER",
    payload: text
  };
};

// Persist to state active merchant
export const SET_ACTIVE_MERCHANT = merchant => {
  return {
    type: "SET_ACTIVE_MERCHANT",
    payload: merchant
  };
};

// Persist to state active card
export const SET_ACTIVE_CARD = card => {
  return {
    type: "SET_ACTIVE_CARD",
    payload: card
  };
};

// ACTIONS FUNCTIONS
//Fetch user from API
export const REQUEST_USER = userID => {
  return async function(dispatch) {
    const { id, token } = userID;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Fetch user from API
    const res = await axios.get(`${settings.url.api}/users/${id}`, config);

    await Storage.setItem("user", res.data.data);

    dispatch(LOAD_USER(res.data.data));

    // WATCH_USER(userID);
  };
};

//Watch user changes from API
export const WATCH_USER = userID => {
  return function(dispatch) {
    const socket = io(`${settings.url.watch}`, { query: `id=${userID.id}` });

    socket.on("change", () => {
      dispatch(REQUEST_USER(userID));
    });
  };
};
