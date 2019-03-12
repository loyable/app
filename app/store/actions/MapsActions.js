import firebase from "../../config/firebase";

export const SET_LOCATION = position => {
  return {
    type: "SET_LOCATION",
    payload: position
  };
};
