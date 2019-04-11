import firebase from "../../config/firebase";

export const SET_LOCATION = position => {
  return {
    type: "SET_LOCATION",
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
