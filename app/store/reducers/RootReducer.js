import AuthReducer from "./AuthReducer";
import CardsReducer from "./CardsReducer";
import MapsReducer from "./MapsReducer";
import UserReducer from "./UserReducer";

import { combineReducers } from "redux";

const RootReducer = combineReducers({
  auth: AuthReducer,
  cards: CardsReducer,
  maps: MapsReducer,
  user: UserReducer
});

export default RootReducer;
