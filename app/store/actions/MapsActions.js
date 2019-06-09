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

export const REQUEST_MERCHANTS = (userID, callback) => {
  return function(dispatch) {
    const { id, token } = userID;

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });
    fetch(`${settings.url.api}/users/${id}/merchants`, {
      headers
    })
      .then(res => res.json())
      .then(merchants => {
        dispatch(LOAD_MERCHANTS(merchants));
        if (callback) callback();
      });
  };
};
