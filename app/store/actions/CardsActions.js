import firebase from "../../config/firebase";

import { store } from "../../store";

export const FILTER_CARDS = () => {
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
export const GET_CARDS = cards => {
  return {
    type: "GET_CARDS",
    payload: cards
  };
};

export const WATCH_CARDS = () => {
  return function(dispatch) {
    firebase
      .database()
      .ref("cards")
      .on(
        "value",
        function(snapshot) {
          let cards = snapshot.val();
          dispatch(GET_CARDS(cards));
          store.dispatch(FILTER_CARDS());
        },
        function(error) {
          console.log(error);
        }
      );
  };
};
