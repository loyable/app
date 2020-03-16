import React, { useReducer } from "react";

import MerchantContext from "./merchantContext";
import merchantReducer from "./merchantReducer";

// Import libraries
import io from "socket.io-client";
import axios from "axios";

import {
  GET_MERCHANTS,
  FILTER_MERCHANTS,
  SET_FILTER,
  SET_ACTIVE_MERCHANT,
  SET_ACTIVE_CARD,
  CLEAR_FILTER
} from "../types";

// Import global variables
import settings from "../../config/settings";

// Import storage
import Storage from "../asyncstorage";

const MerchantState = props => {
  const initialState = {
    merchants: null,
    currentMerchant: null,
    currentCard: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(merchantReducer, initialState);

  const getMerchants = async () => {
    try {
      const res = await axios.get("/merchants");

      dispatch({
        type: GET_MERCHANTS,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  const filterMerchants = text => {
    dispatch({ type: FILTER_MERCHANTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <MerchantContext.Provider
      value={{
        merchants: state.merchants,
        currentMerchant: state.currentMerchant,
        currentCard: state.currentCard,
        filtered: state.filtered,
        error: state.error,
        getMerchants,
        filterMerchants,
        clearFilter
      }}
    >
      {props.children}
    </MerchantContext.Provider>
  );
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

export default MerchantState;
