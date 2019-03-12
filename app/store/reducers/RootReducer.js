import AuthReducer from "./AuthReducer";
import CardsReducer from "./CardsReducer";
import MapsReducer from "./MapsReducer";

import { combineReducers } from "redux";

const RootReducer = combineReducers({
  auth: AuthReducer,
  cards: CardsReducer,
  maps: MapsReducer
});

export default RootReducer;
