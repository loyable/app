import axios from "axios";

import settings from "../../config/settings";

//Persist to state user data
export const LOAD_MERCHANTS = merchants => {
  return {
    type: "LOAD_MERCHANTS",
    payload: merchants
  };
};

export const SET_USER_LOCATION = position => {
  return {
    type: "SET_USER_LOCATION",
    payload: position
  };
};

export const SET_MAP_LOCATION = position => {
  return {
    type: "SET_MAP_LOCATION",
    payload: position
  };
};

export const REQUEST_MERCHANTS = userID => {
  return async function(dispatch) {
    const { id, token } = userID;

    const req = await axios.get(`${settings.url.api}/users/${id}/merchants`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(LOAD_MERCHANTS(req.data.data));
  };
};
