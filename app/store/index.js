import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import RootReducer from "./reducers/RootReducer";

import { reduxFirestore, getFirestore } from "redux-firestore";

import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

import firebase from "../config/firebase";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
