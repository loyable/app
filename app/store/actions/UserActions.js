
import { store } from "../../store";

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

export const WATCH_USER = () => {
  return function(dispatch) {
    fetch("http://192.168.1.169:5000/user/4048ed6b-bcad-4e73-9852-1ba4c585acdb/")
      .then(response => response.json())
      .then(user => {
          dispatch(LOAD_USER(user));
      });

  };
};
