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

export const REQUEST_MERCHANTS = callback => {
  return function(dispatch) {
    fetch(`${settings.url.api}/merchants`)
      .then(response => response.json())
      .then(merchants => {
        dispatch(LOAD_MERCHANTS(merchants));
        if (callback) callback();
      });
  };
};
